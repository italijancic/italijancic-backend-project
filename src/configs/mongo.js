import config from './app.configs.js'
import mongoose from 'mongoose'

mongoose.set('strictQuery', false)
mongoose.connect(config.mongoUri, (err) => {
  if (err) {
    console.log('❌ Error:' + err)
  } else {
    console.log('✅ Connected to MongoDB')
  }
})

export default mongoose
