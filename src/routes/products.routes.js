import { Router } from 'express'

import * as products from '../controllers/products.controllers.js'

const router = Router()

router.get('/', products.getProducts)

router.get('/:pid', products.getproductById)

export default router