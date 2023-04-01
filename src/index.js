import configs from './configs/app.configs.js'
import app from './app.js'

import { Server } from 'socket.io'
import { webSocketInit } from './utils/websocket.js'

import routes from './routes/index.routes.js'
import logger from './utils/logger.utils.js'

// Implement socket on application middleware to use Socket.io in HTTP request
// See: https://stackoverflow.com/questions/47837685/use-socket-io-in-expressjs-routes-instead-of-in-main-server-js-file
app.use((req, res, next) => {
  req.io = io
  next()
})

// HTTP Server routes
app.use(routes)

const server = app.listen(configs.port, () => {
  logger.info(`[index.js]: 🚀 Server started on port http://localhost:${configs.port}`)
})

server.on('error', (err) => console.log(err))

// Create Socket.io server
const io = new Server(server)
// Init Socket.io event driver
webSocketInit(io)