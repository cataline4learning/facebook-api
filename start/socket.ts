import Ws from 'App/Services/Ws'
import { User } from 'App/Models'
import { getIds, OnlineUser, updateOnlineFollowing } from 'App/Utils'

const onlineUsers: OnlineUser[] = []

Ws.start((socket) => {
  socket.on('isOnline', async ({ userId }) => {
    onlineUsers.push({
      databaseId: userId,
      socketId: socket.id
    })

    await updateOnlineFollowing({ onlineUsers, socket, userId })

    socket.on('disconnect', async () => {
      const index = onlineUsers.findIndex(({ socketId }) => socketId === socket.id)

      onlineUsers.splice(index, 1)

      await updateOnlineFollowing({ onlineUsers, socket, userId })
    })
  })

  socket.on('getOnlineFollowing', async ({ userId }) => {
    const user = await User.findOrFail(userId)

    await user.preload('following', (query) => {
      query.whereIn('following_id', getIds(onlineUsers))
    })

    socket.emit('onlineFollowingList', user.following)
  })

  socket.on('create', (room) => {
    socket.join(room)
  })
})
