import _ from 'lodash'

import productModel from '../../models/Product.model.js'

class ProductMongo {

  constructor(productMode){
    this.product = productMode
  }

  async getProducts(params) {

    try {

      let result = []

      if( !_.isEmpty(params) ) {
        const { limit, page, sort, query } = params
        if (query) {
          result = await this.product.paginate({ ...JSON.parse(query), deleted: { $eq: false } }, {limit: limit, page: page, sort: [['price', sort]], lean: true})
        } else {
          result = await this.product.paginate({ deleted: { $eq: false } }, {limit: limit, page: page, sort: [['price', sort]], lean: true})
        }
      } else {
        result = await this.product.paginate({ deleted: { $eq: false } }, {pagination: false, lean: true})
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

      const product = await this.product.findById(productId)
      if (product) {
        return product
      } else {
        throw new Error('Product does not exist')
      }

    } catch (error) {
      throw new Error(error.message)
    }
  }

  async createProduct(product) {
    try {

      // First calidate no repeat product code
      const foundedProduct = await this.product.findOne( { code: product.code } )
      if (foundedProduct) {
        throw new Error('Product code already exist')
      } else {
        const createdProduct = await this.product.create(product)
        return createdProduct
      }

    } catch (error) {
      throw new Error(error.message)
    }
  }

  async updateProduct(productId, data) {

    try {

      const updatedProduct = await this.product.findByIdAndUpdate(productId, data, { new: true })
      return updatedProduct

    } catch (error) {
      throw new Error(error.message)
    }
  }

  async deleteProduct(productId) {
    try {

      await this.product.delete( { _id: productId } )

    } catch (error) {
      throw new Error(error.message)
    }
  }
}

export default new ProductMongo(productModel)