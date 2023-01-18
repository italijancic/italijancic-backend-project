import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

import dbConnect from './configs/db.config.js'
import routes from './routes/index.routes.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(routes)

// Connect to MongoDB
dbConnect()

const PORT = 8080

const server = app.listen(PORT, () => {
  console.log(`🚀 Server started on port http://localhost:${PORT}`)
})

server.on('error', (err) => console.log(err))