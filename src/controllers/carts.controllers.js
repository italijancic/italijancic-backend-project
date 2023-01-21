import cartManagerDB from '../services/carts.mongo.services.js'

export const postCart = async (req, res) => {
  try {

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

    const products = await cartManagerDB.getProductsByCartId(cid)

    res.status(200).json({
      success: true,
      products
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}