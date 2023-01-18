import productManagerFs from '../services/products.fs.services.js'
import productManagerDB from '../services/products.mongo.services.js'

export const getProducts = async (req, res) => {
  try {
    const { limit } = req.query

    const products = await productManagerFs.getProducts()

    if (!isNaN(limit)) {
      res.status(200).json({
        success: true,
        limit: products.slice(0, Number(limit))
      })
    } else if (limit && isNaN(limit)) {
      res.status(400).json({
        success: false,
        message: 'Limit is must be a number'
      })
    } else {
      res.status(200).json({
        success: true,
        procuts: products
      })
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const getproductById = async (req, res) => {
  try {
    let { pid } = req.params

    if (!isNaN(pid)) {

      const foundedProduct = await productManagerFs.getproductById(Number(pid))
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
      success: false,
      message: error.message
    })
  }
}

export const postProduct = async (req, res) => {
  try {
    const product = req.body

    // Save on file
    await productManagerFs.addProduct(product)
    // Save on MongoDB
    await productManagerDB.createProduct(product)

    // Send update over ws
    const productsList = await productManagerFs.getProducts()
    req.io.emit('products', productsList)

    res.status(201).json({
      success: true,
      message: 'Product creation OK',
      product: product
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const updateProduct = async (req, res) => {
  try {

    const pid = req.params.pid
    const updatedProduct = req.body

    await productManagerFs.updateProduct(Number(pid), updatedProduct)

    // Send update over ws
    const productsList = await productManagerFs.getProducts()
    req.io.emit('products', productsList)

    res.status(200).json({
      success: true,
      message: `Product Id = ${req.params.pid} successfully updated`,
      updatedProduct: updatedProduct
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const deleteProductById = async (req, res) => {
  try {

    await productManagerFs.deleteProduct(Number(req.params.pid))

    // Send update over ws
    const productsList = await productManagerFs.getProducts()
    req.io.emit('products', productsList)

    res.status(200).json({
      success: true,
      message: `Product Id = ${req.params.pid} successfully deleted`
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}