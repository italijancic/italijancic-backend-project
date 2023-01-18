import mongoose from 'mongoose'

const dbConnect = async () => {
  try {
    console.log('[configs/db.config.js]: ⏳ Connecting DB...')
    mongoose.set('strictQuery', false)
    await mongoose.connect(process.env.DB_URL || '')
    console.log('[configs/db.config.js]: ✅ DB Sucessfully connected!')
  } catch (error) {
    console.log(error)
  }
}

export default dbConnect
