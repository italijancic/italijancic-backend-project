import dotenv from 'dotenv'
dotenv.config()

const configs = {
  port: process.env.PORT || 8080,
  mongoUri: process.env.DB_URL || null,
  cookieSecret: process.env.COOKIE_SECRET || null,
  gitHub: {
    clientId: process.env.CLIENT_ID || null,
    clientSecret: process.env.CLIENT_SECRET || null,
    appId: process.env.APP_ID || null
  }
}

export default configs