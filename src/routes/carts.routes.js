import { Router } from 'express'

import * as carts from '../controllers/carts.controllers.js'

const router = Router()

router.post('/', carts.postCart)

router.put('/:cid', carts.addProductsToCart)

router.put('/:cid/product/:pid', carts.addProductToCart)

router.delete('/:cid/product/:pid', carts.deleteProductToCart)

router.get('/:cid', carts.getProductsByCartId)


export default router