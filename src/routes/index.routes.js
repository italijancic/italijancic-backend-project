import { Router } from 'express'

import productsRoutes from './products.routes.js'
import cartsRoutes from './carts.routes.js'

const router = Router()

// Products API
router.use('/api/products', productsRoutes)

// Cart API
router.use('/api/carts', cartsRoutes)

export default router