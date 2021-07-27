import { BaseModel, column, hasMany, HasMany, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import { Message, User } from 'App/Models'

export default class Conversation extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userIdOne: number

  @column()
  public userIdTwo: number

  @hasMany(() => Message)
  public messages: HasMany<typeof Message>

  @belongsTo(() => User, { foreignKey: 'userIdOne' })
  public userOne: BelongsTo<typeof User>

  @belongsTo(() => User, { foreignKey: 'userIdTwo' })
  public userTwo: BelongsTo<typeof User>
}
