import { Router } from 'express'

import * as carts from '../controllers/carts.controllers.js'

const router = Router()

router.post('/', carts.postCart)

export default router