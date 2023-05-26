import cartModel from '../../models/Cart.model.js'

class CartMongo {
  constructor(cartModel) {
    this.cart = cartModel
  }

  async getCarts() {
    try {

      const carts = await this.cart.find({}).lean()
      return carts

    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getCartById(cartId) {
    try {

      const cart = await this.cart.findById(cartId).lean()
      return cart

    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getProductsByCartId(cartId) {
    try {

      const products = await this.cart.findById(cartId).populate('items.product')
      return products

    } catch (error) {
      throw new Error(error.message)
    }
  }

  async createCart() {
    try {

      const createdCart = await this.cart.create({})

      return createdCart

    } catch (error) {
      throw new Error(error.message)
    }
  }

  async addProductToCart(cartId, productId, quantity) {

    try {

      // Check if cart exist
      const foundedCart = await this.cart.findById(cartId)

      if (foundedCart) {
        // Logic to handle products on cart
        let updatedCart = await this.cart.findOneAndUpdate( { _id: cartId, 'items.product': productId }, { $inc: {'items.$.quantity': quantity} }, { new: true } )

        if (!updatedCart) {
          updatedCart = await this.cart.findOneAndUpdate( { _id: cartId }, { $push: { items: {product: productId, quantity: quantity}} }, { new: true } )
        }

        return updatedCart
      } else {
        throw new Error('Bad or missing cartId')
      }

    } catch (error) {
      throw new Error(error.message)
    }
  }

  async addProductsToCart(cartId, items){
    try {

      let updatedCart = {}

      // Check if cart exist
      const foundedCart = await this.cart.findById(cartId)

      if (foundedCart) {

        for await (const item of items) {
          // Logic to handle products on cart
          updatedCart = await this.cart.findOneAndUpdate({ _id: cartId, 'items.product': item.product }, { $inc: { 'items.$.quantity': item.quantity } }, { new: true })

          if (!updatedCart) {
            updatedCart = await this.cart.findOneAndUpdate({ _id: cartId }, { $push: { items: { product: item.product, quantity: item.quantity } } }, { new: true })
          }
        }

        return updatedCart

      } else {
        throw new Error('Bad or missing cart Id')
      }
    } catch (error) {
      throw new Error('Error adding products to cart')
    }
  }

  async deleteProductToCart(cartId, productId) {

    try {

      // Check if cart exist
      const foundedCart = await this.cart.findById(cartId)
      const foundedProduct = await this.cart.findOne({ _id: cartId, 'items.product': productId })

      if (foundedCart) {
        if (foundedProduct) {

          // Logic to handle delete product from cart
          await this.cart.findOneAndUpdate({ _id: cartId, 'items.product': productId }, { $inc: { 'items.$.quantity': -1 } })
          // Delete product if quantity is equal to zero
          let updatedCart = await this.cart.findOneAndUpdate({ _id: cartId, 'items.product': productId }, { $pull: { items: { product: productId, quantity: 0 } } }, { new: true })

          if (updatedCart === null) {
            const currentCart = await this.cart.findById(cartId)
            return currentCart
          } else {
            return updatedCart
          }

        } else {
          throw new Error('Bad or missing productId')
        }

      } else {
        throw new Error('Bad or missing cartId')
      }

    } catch (error) {
      throw new Error(error.message)
    }
  }

  async deleteCart(cartId) {
    try {

      await this.cart.delete( { _id: cartId } )

    } catch (error) {
      throw new Error(error.message)
    }
  }

}

export default new CartMongo(cartModel)
