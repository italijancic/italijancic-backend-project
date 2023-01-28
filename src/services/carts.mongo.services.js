import Cart from '../models/Cart.model.js'

class CartManagerDB{
  constructor(){}

  async getCarts() {
    try {

      const carts = await Cart.find({}).lean()
      return carts

    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getCartById(cartId) {
    try {

      const cart = await Cart.findById(cartId).lean()
      return cart

    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getProductsByCartId(cartId) {
    try {

      const products = await Cart.findById(cartId).populate('items.product')
      return products

    } catch (error) {
      throw new Error(error.message)
    }
  }

  async createCart() {
    try {

      const createdCart = await Cart.create({})

      return createdCart

    } catch (error) {
      throw new Error(error.message)
    }
  }

  async addProductToCart(cartId, productId, quantity) {

    try {

      // Check if cart exist
      const foundedCart = await Cart.findById(cartId)

      if (foundedCart) {
        // Logic to handle products on cart
        let updatedCart = await Cart.findOneAndUpdate( { _id: cartId, 'items.product': productId }, { $inc: {'items.$.quantity': quantity} }, { new: true } )

        if (!updatedCart) {
          updatedCart = await Cart.findOneAndUpdate( { _id: cartId }, { $push: { items: {product: productId, quantity: quantity}} }, { new: true } )
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
      const foundedCart = await Cart.findById(cartId)

      if (foundedCart) {

        for await (const item of items) {
          // Logic to handle products on cart
          updatedCart = await Cart.findOneAndUpdate({ _id: cartId, 'items.product': item.product }, { $inc: { 'items.$.quantity': item.quantity } }, { new: true })

          if (!updatedCart) {
            updatedCart = await Cart.findOneAndUpdate({ _id: cartId }, { $push: { items: { product: item.product, quantity: item.quantity } } }, { new: true })
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
      const foundedCart = await Cart.findById(cartId)
      const foundedProduct = await Cart.findOne({ _id: cartId, 'items.product': productId })

      if (foundedCart) {
        if (foundedProduct) {

          // Logic to handle delete product from cart
          await Cart.findOneAndUpdate({ _id: cartId, 'items.product': productId }, { $inc: { 'items.$.quantity': -1 } })
          // Delete product if quantity is equal to zero
          let updatedCart = await Cart.findOneAndUpdate({ _id: cartId, 'items.product': productId }, { $pull: { items: { product: productId, quantity: 0 } } }, { new: true })

          if (updatedCart === null) {
            const currentCart = await Cart.findById(cartId)
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

      await Cart.delete( { _id: cartId } )

    } catch (error) {
      throw new Error(error.message)
    }
  }

}

const cartsManagerDB = new CartManagerDB()
export default cartsManagerDB