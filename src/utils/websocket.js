
export const webSocketInit = (io) => {

  io.on('connection', (socket) => {

    console.log(`[io.on(connection)]: ⚡️ new client connection - socket.id = ${socket.id}`)

    socket.on('disconnect', (reason) => {
      console.log(`[io.on(disconnect)]: 🔌 client disconnect - socket.id = ${socket.id} - reason: ${reason}`)
    })

  })

}

