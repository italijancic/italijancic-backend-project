import { STATUS } from '../constants/constants.js'
import * as usersServices from '../services/users.services.js'
import * as authServices from '../services/auth.services.js'

export const login = async (req, res) => {
  try {

    const { email, password } = req.body
    const logged = await authServices.login(email, password)

    if (logged) {
      req.session.logged = true
      req.session.user = await usersServices.getUser(email)

      res.status(200).json({
        status: STATUS.SUCCESS,
        message: 'User Login OK'
      })

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
        res.redirect('/login')
      }
    })
  } catch (error) {
    res.status(500).json({
      success: STATUS.FAIL,
      message: error.message
    })
  }
}