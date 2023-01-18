import { Router } from 'express'

import viewsRoutes from './views.routes.js'
import productsRoutes from './products.routes.js'
import cartsRoutes from './carts.routes.js'

const router = Router()

// Views
router.use('/', viewsRoutes)

// Products API
router.use('/api/products', productsRoutes)

// Carts API
router.use('/api/carts', cartsRoutes)

export default router