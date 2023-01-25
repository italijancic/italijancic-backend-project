import mongoose from 'mongoose'
import mongooseDelete from 'mongoose-delete'
import mongoosePaginate from 'mongoose-paginate-v2'

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true
  },
  status: {
    type: Boolean,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  thumbnails: {
    type: [String],
    required: true
  },
}, {timestamps: true})

// Plugins instalations
productSchema.plugin(mongooseDelete, { deletedAt: true})
productSchema.plugin(mongoosePaginate)

const productModel = mongoose.model('Products', productSchema)

export default productModel