import mongoose from 'mongoose'
import mongooseDelete from 'mongoose-delete'

const messageSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
}, {timestamps: true})

messageSchema.plugin(mongooseDelete, { deletedAt: true})

const messageModel = mongoose.model('Messages', messageSchema)

export default messageModel