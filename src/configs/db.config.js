import mongoose from 'mongoose'

import configs from './app.configs.js'

const dbConnect = async () => {
  try {
    console.log('[configs/db.config.js]: ⏳ Connecting DB...')
    mongoose.set('strictQuery', false)
    await mongoose.connect( configs.mongoUri || '')
    console.log('[configs/db.config.js]: ✅ DB Sucessfully connected!')
  } catch (error) {
    console.log(error)
  }
}

export default dbConnect
