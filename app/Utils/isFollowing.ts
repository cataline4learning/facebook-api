import { User } from 'App/Models'
import { AuthContract } from '@ioc:Adonis/Addons/Auth'
import Database from '@ioc:Adonis/Lucid/Database'

export const isFollowing = async (user: User, auth: AuthContract) => {
  const isFollowing = await Database.query()
    .from('follows')
    .where('follower_id', auth.user!.id)
    .first()

  user.$extras.isFollowing = isFollowing ? true : false
}
