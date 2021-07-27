import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { User } from 'App/Models'
import { isFollowing } from 'App/Utils'

export default class UserSearchController {
  public async index({ request, response, auth }: HttpContextContract) {
    const { keyword } = request.get()

    if (!keyword) {
      return response.status(422).send({
        error: { message: 'missing user parameter' }
      })
    }

    const users = await User.query()
      .where('email', 'like', `%${keyword}%`)
      .orWhere('name', 'like', `%${keyword}%`)
      .orWhere('username', 'like', `%${keyword}%`)
      .preload('avatar')

    const queries = users.map(async (user) => {
      await isFollowing(user, auth)
    })

    await Promise.all(queries)

    return users
      .filter(({ id }) => id !== auth.user!.id)
      .map((user) => {
        return user.serialize({
          fields: {
            omit: ['email']
          }
        })
      })
  }
}
