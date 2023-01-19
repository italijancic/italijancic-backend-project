import productManagerFs from '../services/products.fs.services.js'
import productManagerDB from '../services/products.mongo.services.js'

export const getProducts = async (req, res) => {
  try {
    const { limit } = req.query

    // const products = await productManagerFs.getProducts()
    const products = await productManagerDB.getProducts()

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
        products: products
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

    if (pid) {

      // const foundedProduct = await productManagerFs.getproductById(Number(pid))
      const foundedProduct = await productManagerDB.getProductById(pid)
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

    // Save on MongoDB
    const createdProduct = await productManagerDB.createProduct(product)
    console.log(createdProduct)
    console.log(createdProduct._id)
    // Save on file
    await productManagerFs.addProduct(createdProduct)

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

    const { pid } = req.params
    // Delete on file
    await productManagerFs.deleteProduct(Number(pid))
    // Delete on DB
    await productManagerDB.deleteProduct(pid)

    // Send update over ws
    // const productsList = await productManagerFs.getProducts()
    // Get products from DB
    const productsList = await productManagerDB.getProducts()

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