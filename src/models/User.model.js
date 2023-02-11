import { Schema, model } from 'mongoose'
import mongooseDelete from 'mongoose-delete'
import mongoosePaginate from 'mongoose-paginate-v2'

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minLenght: 6
  },
  role: {
    type: String,
    required: true,
    default: 'user'
  }
},
{
  timestamps: true
})

// Plugins instalations
userSchema.plugin(mongooseDelete, { deletedAt: true})
userSchema.plugin(mongoosePaginate)

export const User = model('Users', userSchema)