import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { StoreValidator, UpdateValidator } from 'App/Validators/User/ForgotPassword'
import Mail from '@ioc:Adonis/Addons/Mail'
import { User, UserKey } from 'App/Models'
import faker from 'faker'

export default class UserForgotPasswordController {
  public async store({ request }: HttpContextContract) {
    const { email, redirectUrl } = await request.validate(StoreValidator)

    const user = await User.findByOrFail('email', email)

    const key = faker.datatype.uuid() + user.id

    await user.related('keys').create({ key })

    const link = `${redirectUrl.replace(/\/$/, '')}/${key}`

    await Mail.send((message) => {
      message.to(email)
      message.from('contato@facebook.com', 'Facebook')
      message.subject('Recuperação de senha')
      message.htmlView('mails/forgot-password', { link: link })
    })
  }

  public async show({ params }: HttpContextContract) {
    await UserKey.findByOrFail('key', params.key)
  }

  public async update({ request }: HttpContextContract) {
    const { key, password } = await request.validate(UpdateValidator)

    const userKey = await UserKey.findByOrFail('key', key)

    userKey.load('user')

    userKey.user.merge({ password })

    await userKey.user.save()

    await userKey.delete()

    return { message: 'password changed successfully' }
  }
}
