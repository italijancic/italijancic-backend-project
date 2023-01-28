import _ from 'lodash'
import Product from '../models/Product.model.js'

class ProductManagerDB {
  constructor(){}

  async getProducts(params) {

    try {

      let result = []

      if( !_.isEmpty(params) ) {
        const { limit, page, sort, query } = params
        if (query) {
          result = await Product.paginate({ ...JSON.parse(query), deleted: { $eq: false } }, {limit: limit, page: page, sort: [['price', sort]], lean: true})
        } else {
          result = await Product.paginate({ deleted: { $eq: false } }, {limit: limit, page: page, sort: [['price', sort]], lean: true})
        }
      } else {
        result = await Product.paginate({ deleted: { $eq: false } }, {pagination: false, lean: true})
      }

      return {
        products: result.docs,
        metadata: _.omit(result, ['docs'])
      }

    } catch (error) {
      throw new Error(error.message)
    }

  }

  async getProductById(productId) {

    try {

      const product = await Product.findById(productId)
      return product

    } catch (error) {
      throw new Error(error.message)
    }
  }

  async createProduct(product) {
    try {

      // First calidate no repeat product code
      const foundedProduct = await Product.findOne( { code: product.code } )
      if (foundedProduct) {
        throw new Error('Product code already exist')
      } else {
        const createdProduct = await Product.create(product)
        return createdProduct
      }

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

      await Product.delete( { _id: productId } )

    } catch (error) {
      throw new Error(error.message)
    }
  }

}

const productManagerDB = new ProductManagerDB()
export default productManagerDB



