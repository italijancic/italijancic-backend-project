import { STATUS } from '../constants/constants.js'
import factory from '../services/factory.js'
import { getProductsMocks } from '../mocks/produts.mock.js'

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
        status: STATUS.SUCCESS,
        product: foundedProduct
      })
    } else {
      res.status(400).json({
        status: STATUS.FAIL,
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

    product.owner = req.session.user.id

    // Save on MongoDB
    const savedProduct = await factory.products.createProduct(product)

    // Send update over ws
    const productsList = await factory.products.getProducts()
    req.io.emit('products', productsList)

    res.status(201).json({
      status: STATUS.SUCCESS,
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
      status: STATUS.SUCCESS,
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
    const user = req.session.user

    // Delete on DB
    await factory.products.deleteProduct(pid, user)

    // Get products from DB and send over ws
    const productsList = await factory.products.getProducts()
    req.io.emit('products', productsList)

    res.status(200).json({
      status: STATUS.SUCCESS,
      message: `Product Id = ${req.params.pid} successfully deleted`
    })

  } catch (error) {
    res.status(500).json({
      status: STATUS.FAIL,
      message: error.message
    })
  }
}

export const mockProducts = async (req, res) => {
  try {

    const products = getProductsMocks(100)

    res.status(200).json({
      status: STATUS.SUCCESS,
      products
    })

  } catch (error) {
    res.status(500).json({
      status: STATUS.FAIL,
      message: error.message
    })
  }
}
