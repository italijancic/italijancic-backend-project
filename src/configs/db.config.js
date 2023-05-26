import mongoose from 'mongoose'

import logger from '../utils/logger.utils.js'
import configs from './app.configs.js'

const dbConnect = async () => {
  try {
    logger.info('[configs/db.config.js]: ⏳ Connecting DB...')
    mongoose.set('strictQuery', false)
    await mongoose.connect( configs.mongoUri || '')
    logger.info('[configs/db.config.js]: ✅ DB Sucessfully connected!')
  } catch (error) {
    logger.fatal(error)
  }
}

export default dbConnect
