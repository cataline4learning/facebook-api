import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { User } from 'App/Models'
import { isFollowing } from 'App/Utils'

export default class FollowingController {
  public async index({ request, response, auth }: HttpContextContract) {
    const { username } = request.qs()

    if (!username) {
      return response.badRequest({ error: { message: 'missing username' } })
    }

    const user = await User.findByOrFail('username', username)

    await user.load('following')

    const queries = user.following.map(async (user) => {
      await isFollowing(user, auth)
    })

    await Promise.all(queries)

    return user.following
  }
}
