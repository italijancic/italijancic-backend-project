import { STATUS } from '../constants/constants.js'

export const authMiddleware = (req, res, next) => {
  try {
    if (req.session.logged) {
      req.session.touch()
      next()
    } else {
      res.redirect('/login')
    }
  } catch (error) {
    res.status(403).json({
      success: STATUS.FAIL,
      message: error.message
    })
  }
}

export const isLogged = (req, res, next) => {
  try {
    if (req.session.logged) {
      req.session.touch()
      next()
    } else {
      throw new Error('User not logged')
    }
  } catch (error) {
    res.status(403).json({
      success: STATUS.FAIL,
      message: error.message
    })
  }
}

export const isUser = (req, res, next) => {
  try {
    if (req.session.user.role === 'user') {
      req.session.touch()
      next()
    } else {
      throw new Error('User must have a user role')
    }
  } catch (error) {
    res.status(403).json({
      success: STATUS.FAIL,
      message: error.message
    })
  }
}

export const isAdmin = (req, res, next) => {
  try {
    if (req.session.user.role === 'admin') {
      req.session.touch()
      next()
    } else {
      throw new Error('Must be an admin user')
    }
  } catch (error) {
    res.status(403).json({
      success: STATUS.FAIL,
      message: error.message
    })
  }
}

export const isAdminOrPremium = (req, res, next) => {
  try {
    if (req.session.user.role === 'admin' || req.session.user.role === 'premium') {
      req.session.touch()
      next()
    } else {
      throw new Error('Must be an admin or premium user to delete products')
    }
  } catch (error) {
    res.status(403).json({
      success: STATUS.FAIL,
      message: error.message
    })
  }
}