import { string } from '@ioc:Adonis/Core/Helpers'
import { BaseModel } from '@ioc:Adonis/Lucid/Orm'

BaseModel.namingStrategy.serializedName = (_model, key) => {
  return string.camelCase(key)
}
