import { Router } from 'express'
import { isLogged, isUser } from '../middlewares/auth.middleware.js'

import * as carts from '../controllers/carts.controllers.js'

const router = Router()

router.post('/', carts.postCart)

router.put('/:cid', [ isLogged, isUser ], carts.addProductsToCart)

router.put('/:cid/product/:pid', [ isLogged, isUser ], carts.addProductToCart)

router.delete('/:cid/product/:pid', carts.deleteProductToCart)

router.get('/:cid', carts.getProductsByCartId)

router.post('/:cid/purchase', carts.purchase)

export default router