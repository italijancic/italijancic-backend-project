import { STATUS } from '../constants/constants.js'
import cartManagerDB from '../services/carts.mongo.services.js'

export const postCart = async (req, res) => {
  try {

    const createdCart = await cartManagerDB.createCart()

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
    let { cid, pid } = req.params
    let { quantity } = req.body

    if (quantity) {
      await cartManagerDB.addProductToCart(cid, pid, quantity)
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
      const updatedCart = await cartManagerDB.addProductsToCart(cid, items)

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
    const updatedCart = await cartManagerDB.deleteProductToCart(cid, pid)

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

    const products = await cartManagerDB.getProductsByCartId(cid)

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