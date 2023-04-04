import bcrypt from 'bcrypt'

import { STATUS } from '../constants/constants.js'
import * as emailUtils from '../utils/nodemailer.utils.js'
import * as jwtUtil from '../utils/jwt.utils.js'

import factory from '../services/factory.js'


export const sendEmail = async (req, res) => {
  try {
    const { email } = req.body

    const result = await emailUtils.sendEmail(email)

    if (result) {
      res.status(201).json({
        status: STATUS.SUCCESS
      })
    } else {
      throw new Error('Error sending email')
    }

  } catch (error) {
    res.status(500).json({
      status: STATUS.FAIL,
      message: error.message
    })
  }
}

export const view = async (req, res) => {
  try {
    const { token } = req.query

    const isValid = await jwtUtil.verifyToken(token)

    if (isValid) {
      res.render('restorePassword', {})
    } else {
      res.render('login', {})
    }

  } catch (error) {
    res.status(500).json({
      status: STATUS.FAIL,
      message: error.message
    })
  }
}

export const restore = async (req, res) => {

  try {
    const { email, password } = req.body

    if ( email === '' || password === '') {
      throw new Error('email and password can be null')
    }

    const user = await factory.users.getUser(email)

    if (bcrypt.compareSync(password, user.password)) {
      throw new Error('New password must be different from older password')
    }

    user.password = password
    const updatedUser =  await factory.users.updateUser(email, user, true)

    res.status(200).json({
      status: STATUS.SUCCESS,
      updatedUser: updatedUser
    })

  } catch (error) {
    res.status(500).json({
      status: STATUS.FAIL,
      message: error.message
    })
  }

}