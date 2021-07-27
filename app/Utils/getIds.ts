import { OnlineUser } from 'App/Utils'

export const getIds = (onlineUsers: OnlineUser[]) => {
  const ids = onlineUsers.map(({ databaseId }) => databaseId)

  return [...new Set(ids)]
}
