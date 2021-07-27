import { Socket, Server } from 'socket.io'
import Adonis from '@ioc:Adonis/Core/Server'

class Ws {
  public isReady = false
  public io: Server

  public start(callback: (socket: Socket) => void) {
    this.io = new Server(Adonis.instance!)
    this.io.on('connection', callback)
    this.isReady = true
  }
}

export default new Ws()
