import { STATUS } from '../constants/constants.js'
import productManagerDB from '../services/products.mongo.services.js'
import cartsManagerDB from '../services/carts.mongo.services.js'

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
    const productsList = (await productManagerDB.getProducts()).products

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
    const data = await productManagerDB.getProducts( { limit: 2, page: page === undefined ? 1 : page, sort: 'asc', query: null })

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
    const productsList = (await productManagerDB.getProducts()).products

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

    const cart = await cartsManagerDB.getCartById(cid)

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