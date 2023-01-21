import mongoose, { Schema } from 'mongoose'
import MongooseDelete from 'mongoose-delete'

const cartSchema = new Schema({
  products: [{
    product: {
      type: Schema.Types.ObjectId,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    }
  }]
},
{ timestamps: true })

cartSchema.plugin(MongooseDelete, { deletedAt: true })

const cartModel = mongoose.model('Cart', cartSchema)
export default cartModel