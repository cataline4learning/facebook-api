import { User } from 'App/Models'
import { getIds } from 'App/Utils'

export const updateOnlineFollowing = async ({ userId, onlineUsers, socket }) => {
  const user = await User.findOrFail(userId)

  await user.preload('followers', (query) => {
    query.whereIn('follower_id', getIds(onlineUsers))
  })

  user.followers.map((user) => {
    const onlineUser = onlineUsers.find(({ databaseId }) => databaseId === user.id)

    if (onlineUser) {
      socket.to(onlineUser.socketId).emit('updateOnlineFollowing')
    }
  })
}
