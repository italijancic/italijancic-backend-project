import { STATUS } from '../constants/constants.js'
import factory from '../services/factory.js'

export const getProducts = async (req, res) => {
  try {

    const { products, metadata } = await factory.products.getProducts(req.query)

    res.status(200).json({
      status: STATUS.SUCCESS,
      payload: products,
      ...metadata
    })

  } catch (error) {
    res.status(500).json({
      status: STATUS.FAIL,
      message: error.message
    })
  }
}

export const getproductById = async (req, res) => {
  try {
    let { pid } = req.params

    if (pid) {

      const foundedProduct = await factory.products.getProductById(pid)

      res.status(200).json({
        success: true,
        product: foundedProduct
      })
    } else {
      res.status(400).json({
        success: false,
        message: 'Bad or missing product ID'
      })
    }

  } catch (error) {
    res.status(500).json({
      status: STATUS.FAIL,
      message: error.message
    })
  }
}

export const postProduct = async (req, res) => {
  try {
    const product = req.body

    // Save on MongoDB
    const savedProduct = await factory.products.createProduct(product)

    // Send update over ws
    const productsList = await factory.products.getProducts()
    req.io.emit('products', productsList)

    res.status(201).json({
      success: true,
      message: 'Product creation OK',
      product: savedProduct
    })

  } catch (error) {
    res.status(500).json({
      status: STATUS.FAIL,
      message: error.message
    })
  }
}

export const updateProduct = async (req, res) => {
  try {

    const pid = req.params.pid
    const data = req.body

    const updatedProduct = await factory.products.updateProduct(pid, data)

    // Send update over ws
    const productsList = await factory.products.getProducts()
    req.io.emit('products', productsList)

    res.status(200).json({
      success: true,
      message: `Product Id = ${req.params.pid} successfully updated`,
      updatedProduct: updatedProduct
    })

  } catch (error) {
    res.status(500).json({
      status: STATUS.FAIL,
      message: error.message
    })
  }
}

export const deleteProductById = async (req, res) => {
  try {

    const { pid } = req.params
    // Delete on DB
    await factory.products.deleteProduct(pid)

    // Get products from DB and send over ws
    const productsList = await factory.products.getProducts()
    req.io.emit('products', productsList)

    res.status(200).json({
      success: true,
      message: `Product Id = ${req.params.pid} successfully deleted`
    })

  } catch (error) {
    res.status(500).json({
      status: STATUS.FAIL,
      message: error.message
    })
  }
}