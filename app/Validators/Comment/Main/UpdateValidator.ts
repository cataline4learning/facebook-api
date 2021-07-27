import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class UpdateValidator {
  constructor(private ctx: HttpContextContract) {}

  public schema = schema.create({
    content: schema.string({ trim: true })
  })

  public cacheKey = this.ctx.routeKey

  public messages = {}
}
