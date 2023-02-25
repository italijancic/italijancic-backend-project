import express from 'express'
import { engine } from 'express-handlebars'

import cookie from 'cookie-parser'
import session from 'express-session'
import mongoStore from 'connect-mongo'

import passport from './utils/passport.utils.js'
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

// Connect to MongoDB
dbConnect()

// Passport config
app.use(passport.initialize())
app.use(passport.session())

// HTTP Server routes
app.use(routes)

export default app