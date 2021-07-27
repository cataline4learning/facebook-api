import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class StoreValidator {
  constructor(private ctx: HttpContextContract) {}

  public schema = schema.create({
    content: schema.string({ trim: true }),
    postId: schema.number([rules.exists({ table: 'posts', column: 'id' })])
  })

  public cacheKey = this.ctx.routeKey

  public messages = {}
}
