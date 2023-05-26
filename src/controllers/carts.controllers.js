import { STATUS } from '../constants/constants.js'
import factory from '../services/factory.js'

export const postCart = async (req, res) => {
  try {

    const createdCart = await factory.carts.createCart()

    res.status(201).json({
      success: STATUS.SUCCESS,
      createdCart: createdCart,
      message: 'Cart created OK'
    })

  } catch (error) {
    res.status(500).json({
      success: STATUS.FAIL,
      message: error.message
    })
  }
}

export const addProductToCart = async (req, res) => {
  try {
    const { cid, pid } = req.params
    const { quantity } = req.body

    const user = req.session.user

    if (user.role === 'premium') {
      const foundedProduct = await factory.products.getProductById(pid)

      if (foundedProduct.owner === 'admin') {
        throw new Error('premium role user can only delete his products')
      }

      if (foundedProduct.owner._id.toString() !== user._id) {
        throw new Error('premium role user can only delete his products')
      }
    }


    if (quantity) {
      await factory.carts.addProductToCart(cid, pid, quantity)
    } else {
      res.status(401).json({
        success: STATUS.FAIL,
        message: 'quantity param is required'
      })
    }

    res.status(201).json({
      success: STATUS.SUCCESS,
      message: 'Product added to cart OK'
    })

  } catch (error) {
    res.status(500).json({
      success: STATUS.FAIL,
      message: error.message
    })
  }
}

export const addProductsToCart = async (req, res) => {
  try {
    let { cid } = req.params
    let { items } = req.body

    if (items && cid) {
      const updatedCart = await factory.carts.addProductsToCart(cid, items)

      res.status(201).json({
        success: STATUS.SUCCESS,
        message: 'Product added to cart OK',
        updatedCart: updatedCart
      })

    } else {
      res.status(401).json({
        success: STATUS.FAIL,
        message: 'bad or missing request params'
      })
    }

  } catch (error) {
    res.status(500).json({
      success: STATUS.FAIL,
      message: error.message
    })
  }
}

export const deleteProductToCart = async (req, res) => {
  try {
    let { cid, pid } = req.params

    // Check if product id exist
    const updatedCart = await factory.carts.deleteProductToCart(cid, pid)

    res.status(201).json({
      success: STATUS.SUCCESS,
      updatedCart: updatedCart,
      message: 'Product deleted to cart OK'
    })

  } catch (error) {
    res.status(500).json({
      success: STATUS.FAIL,
      message: error.message
    })
  }
}

export const getProductsByCartId = async (req, res) => {
  try {
    const cid = req.params.cid

    const products = await factory.carts.getProductsByCartId(cid)

    res.status(200).json({
      success: STATUS.SUCCESS,
      products
    })

  } catch (error) {
    res.status(500).json({
      success: STATUS.FAIL,
      message: error.message
    })
  }
}


export const purchase = async (req, res) => {
  try {

    let { cid } = req.params

    let purchase = {
      status: false,
      purchaser: '',
      amount: 0
    }

    const cart = await factory.carts.getCartById(cid)
    const user = await factory.users.getUserByCartId(cid)
    purchase.purchaser = user.email

    for await (const item of cart.items) {
      // Get product
      const product = await factory.products.getProductById(item.product)
      // Logic to check stock
      if (item.quantity <= product.stock ) {
        product.stock -= item.quantity
        purchase.amount += product.price * item.quantity
        purchase.status = true
        // Update product stock
        await factory.products.updateProduct(product.id, product)
        // Delete product from cart
        for (let i = 0; i < item.quantity; i++) {
          await factory.carts.deleteProductToCart(cid, item.product)
        }
      }
    }

    const ticket = await factory.tickets.createTicket(purchase)

    res.status(200).json({
      success: STATUS.SUCCESS,
      message: 'Purchase end OK',
      ticket
    })

  } catch (error) {
    res.status(500).json({
      success: STATUS.FAIL,
      message: error.message
    })
  }
}
