import Cart from '../models/Cart.model.js'

class CartManagerDB{
  constructor(){}

  async getCarts() {
    try {

      const carts = await Cart.find({})
      return carts

    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getCartById(cartId) {
    try {

      const cart = await Cart.findById(cartId)
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

  async addProductToCart(cartId, productId) {

    try {

      // Check if cart exist
      const foundedCart = await Cart.findById(cartId)

      if (foundedCart) {
      // Logic to handle products on cart
        let updatedCart = await Cart.findOneAndUpdate( { _id: cartId, 'items.product': productId }, { $inc: {'items.$.quantity': 1} }, { new: true } )

        if (!updatedCart) {
          updatedCart = await Cart.findOneAndUpdate( { _id: cartId }, { $push: { items: {product: productId, quantity: 1}} }, { new: true } )
        }

        return updatedCart
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