import Product from '../models/Product.model.js'

class ProductManagerDB {
  constructor(){}

  async getProducts() {

  }

  async getProductsById(productId) {

  }

  async createProduct(product) {
    try {

      const createdProduct = await Product.create(product)

      return createdProduct

    } catch (error) {
      throw new Error(error.message)
    }
  }

  async updateProduct() {

  }

}

const productManagerDB = new ProductManagerDB()
export default productManagerDB



