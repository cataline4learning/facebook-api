import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { UpdateValidator } from 'App/Validators/User/Main'

export default class UsersController {
  public async show({ auth }: HttpContextContract) {
    const user = auth.user!

    await user.load('avatar')

    return user
  }

  public async update({ request, auth }: HttpContextContract) {
    const data = await request.validate(UpdateValidator)
    const user = auth.user!

    user.merge(data)

    await user.save()

    return user
  }
}
