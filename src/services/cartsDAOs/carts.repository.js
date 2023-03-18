import CartDTO from './carts.dto.js'

export class CartRepository {
  constructor(dao) {
    this.dao = dao
  }

  async getCarts() {
    try {

      const carts = await this.dao.getCarts()
      return carts

    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getCartById(cartId) {
    try {

      const cart = await this.dao.getCartById(cartId).lean()
      const cartDTO = new CartDTO(cart)
      return cartDTO

    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getProductsByCartId(cartId) {
    try {

      const products = await this.dao.getProductsByCartId(cartId)
      return products

    } catch (error) {
      throw new Error(error.message)
    }
  }

  async createCart() {
    try {

      const createdCart = await this.dao.createCart()
      const cartDTO = new CartDTO(createdCart)
      return cartDTO

    } catch (error) {
      throw new Error(error.message)
    }
  }

  async addProductToCart(cartId, productId, quantity) {

    try {

      const updatedCart = await this.dao.addProductToCart(cartId, productId, quantity)
      const cartDTO = new CartDTO(updatedCart)
      return cartDTO

    } catch (error) {
      throw new Error(error.message)
    }
  }

  async addProductsToCart(cartId, items){
    try {

      const updatedCart = await this.dao.addProductsToCart(cartId, items)
      const cartDTO = new CartDTO(updatedCart)
      return cartDTO

    } catch (error) {
      throw new Error('Error adding products to cart')
    }
  }

  async deleteProductToCart(cartId, productId) {

    try {

      const updatedCart = await this.dao.deleteProductsToCart(cartId, productId)
      const cartDTO = new CartDTO(updatedCart)
      return cartDTO

    } catch (error) {
      throw new Error(error.message)
    }
  }

  async deleteCart(cartId) {
    try {

      await this.dao.deleteCart(cartId)

    } catch (error) {
      throw new Error(error.message)
    }
  }
}