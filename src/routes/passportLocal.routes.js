import { Router } from 'express'
import passport from '../utils/passport.utils.js'

const router = Router()

// Catch error route
router.get('/fail', (req, res) => {

  console.log('Fail')

  res.status(401).json({
    success: false,
    message: 'Error on passport strategy'
  })

})

router.post('/singup', passport.authenticate('singup', {
  failureRedirect: '/api/passportLocal/fail'
}), (req, res) => {

  res.redirect('/')

})

router.post('/login', passport.authenticate('login', {
  failureRedirect: '/api/passportLocal/fail'
}), (req, res) => {

  // Save session data
  req.session.logged = true
  req.session.user = req.user

  res.redirect('/')
})

export default router