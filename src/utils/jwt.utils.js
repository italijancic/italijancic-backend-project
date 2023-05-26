import jwt from 'jsonwebtoken'

import configs from '../configs/app.configs.js'


export const generateToken = (email) => {
  const token = jwt.sign({ email }, configs.jwtSecret, { expiresIn: '3600s'})
  return token
}

export const verifyToken = async (token) => {
  try {

    const isValid = jwt.verify(token, configs.jwtSecret)

    if (isValid) {
      return true
    } else {
      throw new Error('Invalid or expired token')
    }

  } catch (error) {
    throw new Error(error.message)
  }
}

export const getExpirationDate = (token) => {
  const decodedToken = jwt.decode(token)
  const expirationDate = new Date(decodedToken.exp * 1000)

  return expirationDate
}

