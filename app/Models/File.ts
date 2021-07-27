import { BaseModel, column, computed } from '@ioc:Adonis/Lucid/Orm'
import { FileCategory } from 'App/Utils'
import Env from '@ioc:Adonis/Core/Env'

export default class File extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public id: number

  @column({ serializeAs: null })
  public fileCategory: FileCategory

  @column({ serializeAs: null })
  public fileName: string

  @column({ serializeAs: null })
  public ownerId: number

  @computed()
  public get url() {
    return this.fileName ? `${Env.get('APP_URL')}/uploads/${this.fileName}` : null
  }
}
