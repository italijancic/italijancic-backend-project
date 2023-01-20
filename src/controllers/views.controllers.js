// import productManagerFs from '../services/products.fs.services.js'
import productManagerDB from '../services/products.mongo.services.js'

export const getHome = async (req, res) => {
  try {

    // Get products from file
    // const productsList = await productManagerFs.getProducts()
    // Get produts from DB
    const productsList = await productManagerDB.getProducts()

    res.render('index', {
      products: productsList
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const getRealTimeProducts = async (req, res) => {
  try {

    // Get products from file
    // const productsList = await productManagerFs.getProducts()
    // Get produts from DB
    const productsList = await productManagerDB.getProducts()

    res.render('realTimeProducts', {
      products: productsList
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const getChat = async (req, res) => {
  try {

    res.render('chat', {})

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}