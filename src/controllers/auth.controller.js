import { STATUS } from '../constants/constants.js'
import * as usersServices from '../services/users.services.js'
import * as authServices from '../services/auth.services.js'

export const login = async (req, res) => {
  try {

    console.log(req.body)
    const { email, password } = req.body
    const logged = await authServices.login(email, password)

    if (logged) {
      req.session.logged = true
      req.session.user = await usersServices.getUser(email)

      res.redirect('/')

    } else {
      res.status(401).json({
        success: STATUS.FAIL,
        message: 'Incorrect user email and password combination'
      })
    }
  } catch (error) {
    res.status(500).json({
      success: STATUS.FAIL,
      message: error.message
    })
  }
}

export const logout = async (req, res) => {
  try {
    req.session.destroy((error) => {
      if (error) {
        res.json(error)
      } else {
        res.status(200).json({
          success: STATUS.SUCCESS,
          message: 'Logout OK'
        })
      }
    })
  } catch (error) {
    res.status(500).json({
      success: STATUS.FAIL,
      message: error.message
    })
  }
}