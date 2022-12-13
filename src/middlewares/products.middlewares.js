import { ProductManager } from '../services/products.services.js'

const productManager = new ProductManager('./src/store/products.json')

export const loadProductManager = (req, res, next) => {
  req.productManager = productManager
  next()
}