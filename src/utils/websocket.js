import Message from '../models/Message.model.js'

export const webSocketInit = (io) => {

  io.on('connection', (socket) => {

    console.log(`[io.on(connection)]: ⚡️ new client connection - socket.id = ${socket.id}`)

    Message.find({}, (err, result) => {
      if (err) {
        console.log(err)
      } else {
        socket.emit('wellcome', result)
      }
    })

    socket.on('newUser', (data) => {
      socket.broadcast.emit('newUser', data)
    })

    socket.on('message', async (data) => {
      try {
        await Message.create(data)
        const messages = await Message.find({})
        io.emit('message', messages)
      } catch (error) {
        console.log(error.message)
      }
    })

    socket.on('disconnect', (reason) => {
      console.log(`[io.on(disconnect)]: 🔌 client disconnect - socket.id = ${socket.id} - reason: ${reason}`)
    })

  })

}

