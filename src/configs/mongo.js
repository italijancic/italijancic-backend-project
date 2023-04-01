import mongoose from 'mongoose'

import config from './app.configs.js'
import logger from '../utils/logger.utils.js'

mongoose.set('strictQuery', false)
mongoose.connect(config.mongoUri, (err) => {
  if (err) {
    logger.error('❌ Error:' + err)
  } else {
    logger.info('✅ Connected to MongoDB')
  }
})

export default mongoose
