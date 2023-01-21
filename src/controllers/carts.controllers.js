// import cartManagerFs from '../services/carts.fs.services.js'
// import productManagerFs from '../services/products.fs.services.js'
import cartManagerDB from '../services/carts.mongo.services.js'
import productManagerDB from '../services/products.mongo.services.js'

// const productManager = new ProductManager('./src/store/products.json')
// const cartManager = new CartManager('./src/store/carts.json')

export const postCart = async (req, res) => {
  try {

    // await cartManagerFs.createNewCart()
    const createdCart = await cartManagerDB.createCart()

    res.status(201).json({
      success: true,
      createdCart: createdCart,
      message: 'Cart created OK'
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const addProductToCart = async (req, res) => {
  try {
    let { cid, pid } = req.params

    // Check if product id exist
    await cartManagerDB.addProductToCart(cid, pid)

    res.status(201).json({
      success: true,
      message: 'Product added to cart OK'
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const getProductsByCartId = async (req, res) => {
  try {
    const cid = req.params.cid

    // const cart = await cartManagerFs.getCartById(cid)
    const cart = await cartManagerDB.getCartById(cid)

    let product = {}
    const products = []

    for await (const element of cart.products) {
      product = await productManagerDB.getProductById(element.product)
      products.push(product)
    }

    res.status(200).json({
      success: true,
      cartId: cid,
      products: products
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}