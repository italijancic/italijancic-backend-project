import { Schema, model } from 'mongoose'
import mongooseDelete from 'mongoose-delete'
import mongoosePaginate from 'mongoose-paginate-v2'
import { v4 as uuidv4 } from 'uuid'

const ticketSchema = new Schema({
  code: {
    type: String,
    default: uuidv4(),
    required: true
  },
  purchaseDateTime: {
    type: Date,
    default: new Date(),
    required: true
  },
  amount: {
    type: Number,
    required: true,
  },
  purchaser: {
    type: String,
    required: true,
  },
},
{
  timestamps: true
})

// Plugins instalations
ticketSchema.plugin(mongooseDelete, { deletedAt: true})
ticketSchema.plugin(mongoosePaginate)

export const Tickets =  model('Tickets', ticketSchema)