import { Router } from 'express'
import { isLogged, isAdmin } from '../middlewares/auth.middleware.js'

import * as products from '../controllers/products.controllers.js'

const router = Router()

router.get('/', products.getProducts)

router.get('/:pid', products.getproductById)

router.post('/', [ isLogged, isAdmin ], products.postProduct)

router.put('/:pid', [ isLogged, isAdmin ], products.updateProduct)

router.delete('/:pid', [ isLogged, isAdmin ], products.deleteProductById)

export default router