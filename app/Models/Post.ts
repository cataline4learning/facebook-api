import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  belongsTo,
  BelongsTo,
  hasOne,
  HasOne,
  hasMany,
  HasMany,
  computed
} from '@ioc:Adonis/Lucid/Orm'
import { User, File, Comment, Reaction } from 'App/Models'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public description: string

  @column({ serializeAs: null })
  public userId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @hasOne(() => File, {
    foreignKey: 'ownerId',
    onQuery: (query) => query.where('fileCategory', 'post')
  })
  public media: HasOne<typeof File>

  @hasMany(() => Comment)
  public comments: HasMany<typeof Comment>

  @computed()
  public get commentsCount() {
    return this.$extras.comments_count
  }

  @hasMany(() => Reaction, { serializeAs: null })
  public reactions: HasMany<typeof Reaction>

  @computed()
  public get reactionsCount() {
    return {
      like: this.$extras.likeCount || 0,
      love: this.$extras.loveCount || 0,
      haha: this.$extras.hahaCount || 0,
      sad: this.$extras.sadCount || 0,
      angry: this.$extras.angryCount || 0
    }
  }

  @computed()
  public get activeReaction() {
    return this.reactions && this.reactions.length ? this.reactions[0].type : null
  }
}
