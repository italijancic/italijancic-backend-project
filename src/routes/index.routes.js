import { Router } from 'express'

import viewsRoutes from './views.routes.js'
import productsRoutes from './products.routes.js'
import cartsRoutes from './carts.routes.js'
import usersRoutes from './users.routes.js'
import authRoutes from './auth.routes.js'
import passportLocalRoutes from './passportLocal.routes.js'

const router = Router()

// Views
router.use('/', viewsRoutes)

// auth API
router.use('/api/auth', authRoutes)

// users API
router.use('/api/users', usersRoutes)

// passportLocal api routes
router.use('/api/passportLocal', passportLocalRoutes)

// Products API
router.use('/api/products', productsRoutes)

// Carts API
router.use('/api/carts', cartsRoutes)

export default router