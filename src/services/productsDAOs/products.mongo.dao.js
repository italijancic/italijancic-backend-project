import _ from 'lodash'

import productModel from '../../models/Product.model.js'
import * as emailUtils from '../../utils/nodemailer.utils.js'

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
      if (foundedProduct?.deleted) {
        foundedProduct.deleted = false
        const createdProduct = await this.product.findByIdAndUpdate(foundedProduct._id, foundedProduct, { new: true })
        return createdProduct
        // throw new Error('Product code already exist')
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

  async deleteProduct(productId, user) {
    try {

      const foundedProduct = await this.product.findById(productId).lean()

      if (foundedProduct) {

        if (user.role === 'admin') {
          await this.product.delete({ _id: productId })
          return
        }

        if (foundedProduct.owner === undefined) {
          throw new Error('premium role user can only delethe his products')
        }

        if ( user.role === 'premium' && foundedProduct.owner._id == user._id) {
          await this.product.delete({ _id: productId })
          emailUtils.sendProductDeletedEmail(user.email)
          return
        } else {
          throw new Error('premium role user can only delethe his products')
        }
      } else {
        throw new Error('Product does not exist')
      }


    } catch (error) {
      throw new Error(error.message)
    }
  }
}

export default new ProductMongo(productModel)
