import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class StoreValidator {
  constructor(private ctx: HttpContextContract) {}

  public schema = schema.create({
    description: schema.string.optional({ trim: true })
  })

  public cacheKey = this.ctx.routeKey

  public messages = {}
}
