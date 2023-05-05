import { Router } from 'express'
import * as usersControllers from '../controllers/users.controller.js'
import { uploader } from '../utils/uploader.utils.js'
import { isLogged } from '../middlewares/auth.middleware.js'

const router = Router()

// Create user
router.post('/', usersControllers.createUser)

// Create user
router.post('/:uid/documents',
  [
    // isLogged,
    uploader.fields([
      { name: 'profile' },
      { name: 'product' },
      { name: 'document' }
    ])
  ], usersControllers.uploadFiles)

// Create user from UI
router.post('/ui', usersControllers.createUser)

// Update user
router.put('/updateUser/:email', usersControllers.updateUser)

// Update password
router.put('/updatePassword/:email', usersControllers.updatePassword)

// Get user
router.get('/', usersControllers.getUser)

router.post('/premium/:uid', usersControllers.updateUserRole)

export default router