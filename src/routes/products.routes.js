import { Router } from 'express'
import { isLogged, isAdmin, isAdminOrPremium } from '../middlewares/auth.middleware.js'

import * as products from '../controllers/products.controllers.js'

const router = Router()

router.get('/', products.getProducts)

router.get('/mockingproducts', products.mockProducts)

router.get('/:pid', products.getproductById)

router.post('/', [ isLogged ], products.postProduct)

router.put('/:pid', [ isLogged, isAdmin ], products.updateProduct)

router.delete('/:pid', [ isLogged, isAdminOrPremium ], products.deleteProductById)

export default router