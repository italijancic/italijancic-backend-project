import { STATUS } from '../constants/constants.js'
import factory from '../services/factory.js'

export const login = async (req, res) => {
  try {

    res.render('login', {})

  } catch (error) {
    res.status(500).json({
      success: STATUS.FAIL,
      message: error.message
    })
  }
}

export const register = async (req, res) => {
  try {

    res.render('register', {})

  } catch (error) {
    res.status(500).json({
      success: STATUS.FAIL,
      message: error.message
    })
  }
}

export const getHome = async (req, res) => {
  try {

    // Get produts from DB
    const productsList = (await factory.products.getProducts()).products

    res.render('index', {
      user: req.session.user,
      products: productsList
    })

  } catch (error) {
    res.status(500).json({
      success: STATUS.FAIL,
      message: error.message
    })
  }
}

export const getProducts = async (req, res) => {
  try {

    const { page } = req.query

    // Get produts from DB
    const data = await factory.products.getProducts( { limit: 2, page: page === undefined ? 1 : page, sort: 'asc', query: null })

    res.render('products', {...data})

  } catch (error) {
    res.status(500).json({
      success: STATUS.FAIL,
      message: error.message
    })
  }
}

export const getRealTimeProducts = async (req, res) => {
  try {

    // Get produts from DB
    const productsList = (await factory.products.getProducts()).products

    res.render('realTimeProducts', {
      products: productsList
    })

  } catch (error) {
    res.status(500).json({
      success: STATUS.FAIL,
      message: error.message
    })
  }
}

export const getCart = async (req, res) => {
  try {
    const { cid } = req.params

    const cart = await factory.carts.getCartById(cid)

    res.render('carts', {
      ...cart
    })

  } catch (error) {
    res.status(500).json({
      success: STATUS.FAIL,
      message: error.message
    })
  }
}

export const getChat = async (req, res) => {
  try {

    res.render('chat', {})

  } catch (error) {
    res.status(500).json({
      success: STATUS.FAIL,
      message: error.message
    })
  }
}
