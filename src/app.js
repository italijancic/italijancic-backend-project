import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

import { engine } from 'express-handlebars'
import { Server } from 'socket.io'

import cookie from 'cookie-parser'
import session from 'express-session'
import mongoStore from 'connect-mongo'

import passport from './utils/passport.utils.js'

import { webSocketInit } from './utils/websocket.js'

import dbConnect from './configs/db.config.js'
import routes from './routes/index.routes.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Cookies middleware
app.use(cookie())

// Session config
app.use(session({
  store: new mongoStore({
    mongoUrl: process.env.DB_URL,
    options: {
      userNewUrlparser: true,
      useUnifiedTopology: true,
    }
  }),
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 100000 }
}))

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

// Passport config
app.use(passport.initialize())
app.use(passport.session())

// HTTP Server routes
app.use(routes)

const PORT = process.env.PORT || 3000

const server = app.listen(PORT, () => {
  console.log(`🚀 Server started on port http://localhost:${PORT}`)
})

server.on('error', (err) => console.log(err))

// Create Socket.io server
const io = new Server(server)
// Init Socket.io event driver
webSocketInit(io)