import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class UpdateValidator {
  constructor(private ctx: HttpContextContract) {}

  public schema = schema.create({
    followingId: schema.number([rules.exists({ table: 'users', column: 'id' })])
  })

  public cacheKey = this.ctx.routeKey

  public messages = {}
}
