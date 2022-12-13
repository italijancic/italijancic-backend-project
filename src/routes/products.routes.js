import { Router } from 'express'

import { loadProductManager } from '../middlewares/products.middlewares.js'
import * as products from '../controllers/products.controllers.js'

const router = Router()

router.get('/', loadProductManager, products.getProducts)

router.get('/:pid', loadProductManager, products.getproductById)

export default router