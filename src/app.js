import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

import { engine } from 'express-handlebars'
import { Server } from 'socket.io'

import { webSocketInit } from './utils/websocket.js'

import dbConnect from './configs/db.config.js'
import routes from './routes/index.routes.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Statics folder config
app.use(express.static('public/'))

// Handlebars config
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', 'src/views')

// Implement socket on application middleware to use Socket.io in HTTP request
// See: https://stackoverflow.com/questions/47837685/use-socket-io-in-expressjs-routes-instead-of-in-main-server-js-file
app.use((req, res, next) => {
  req.io = io
  next()
})

// Connect to MongoDB
dbConnect()

// HTTP Server routes
app.use(routes)

const PORT = process.env.PORT ||  8080

const server = app.listen(PORT, () => {
  console.log(`🚀 Server started on port http://localhost:${PORT}`)
})

server.on('error', (err) => console.log(err))

// Create Socket.io server
const io = new Server(server)
// Init Socket.io event driver
webSocketInit(io)