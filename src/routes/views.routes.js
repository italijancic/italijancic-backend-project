import { Router } from 'express'

import * as views from '../controllers/views.controllers.js'

const router = Router()

router.get('/', views.getHome)

router.get('/products', views.getProducts)

router.get('/cart/:cid', views.getCart)

router.get('/realtimeproducts', views.getRealTimeProducts)

router.get('/chat', views.getChat)

export default router