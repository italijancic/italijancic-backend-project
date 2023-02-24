import { Router } from 'express'
import * as usersControllers from '../controllers/users.controller.js'

const router = Router()

// Create user
router.post('/', usersControllers.createUser)

// Create user from UI
router.post('/ui', usersControllers.createUser)

// Update user
router.put('/updateUser/:email', usersControllers.updateUser)

// Update password
router.put('/updatePassword/:email', usersControllers.updatePassword)

// Get user
router.get('/', usersControllers.getUser)

export default router