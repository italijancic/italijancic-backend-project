import { CartManager } from '../services/carts.services.js'

const cartManager = new CartManager('./src/store/carts.json')

export const postCart = async (req, res) => {
  try {

    await cartManager.createNewCart()

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}