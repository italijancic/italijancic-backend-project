import configs from './configs/app.configs.js'
import app from './app.js'

import { Server } from 'socket.io'
import { webSocketInit } from './utils/websocket.js'

// Implement socket on application middleware to use Socket.io in HTTP request
// See: https://stackoverflow.com/questions/47837685/use-socket-io-in-expressjs-routes-instead-of-in-main-server-js-file
app.use((req, res, next) => {
  req.io = io
  next()
})

const server = app.listen(configs.port, () => {
  console.log(`[index.js]: 🚀 Server started on port http://localhost:${configs.port}`)
})

server.on('error', (err) => console.log(err))

// Create Socket.io server
const io = new Server(server)
// Init Socket.io event driver
webSocketInit(io)