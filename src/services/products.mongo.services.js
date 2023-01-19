import Product from '../models/Product.model.js'

class ProductManagerDB {
  constructor(){}

  async getProducts() {

    try {

      const products = await Product.find( { deleted: { $eq: false } }).lean()
      console.log(`[products.mongo.services.js] - getProducts: ${products}`)
      return products

    } catch (error) {
      throw new Error(error.message)
    }

  }

  async getProductById(productId) {

    try {

      console.log(productId)
      // const product = await Product.find( { _id: productId, deleteAt: { $exists: true } })
      const product = await Product.findById(productId)
      return product

    } catch (error) {
      throw new Error(error.message)
    }
  }

  async createProduct(product) {
    try {

      const createdProduct = await Product.create(product)
      return createdProduct

    } catch (error) {
      throw new Error(error.message)
    }
  }

  async updateProduct(productId, data) {

    try {

      const updatedProduct = await Product.findByIdAndUpdate(productId, data, { new: true })
      return updatedProduct

    } catch (error) {
      throw new Error(error.message)
    }
  }

  async deleteProduct(productId) {
    try {

      await Product.deleteMany( { _id: productId } )

    } catch (error) {
      throw new Error(error.message)
    }
  }

}

const productManagerDB = new ProductManagerDB()
export default productManagerDB


