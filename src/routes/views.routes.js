import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import * as views from '../controllers/views.controllers.js'

const router = Router()

router.get('/', authMiddleware, views.getHome)

router.get('/login', views.login)

router.get('/products', authMiddleware, views.getProducts)

router.get('/cart/:cid', authMiddleware, views.getCart)

router.get('/realtimeproducts', authMiddleware, views.getRealTimeProducts)

router.get('/chat', views.getChat)

export default router