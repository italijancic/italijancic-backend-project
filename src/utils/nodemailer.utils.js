import { createTransport } from 'nodemailer'

import configs from '../configs/app.configs.js'
import * as jwtUtils from './jwt.utils.js'

const transportGmail = createTransport({
  service: 'gmail',
  port: 587,
  auth: {
    user: configs.gmailUser,
    pass: configs.gmailAppPass
  }
})

export const sendEmail = async (email) => {
  try {

    const token = jwtUtils.generateToken(email)
    const expirationDate = jwtUtils.getExpirationDate(token)

    const emailOptions = {
      from: configs.gmailUser,
      to: email,
      subject: 'Your link for password restoration',
      text: `Use the following link to access the secret page before ${expirationDate}: http://localhost:${configs.port}/api/restorePassword/?email=${email}&token=${token}`
    }

    const result = await transportGmail.sendMail(emailOptions)
    return result

  } catch (error) {
    throw new Error(error.message)
  }
}

export const sendAccountDeletedEmail = async (email) => {
  try {

    const emailOptions = {
      from: configs.gmailUser,
      to: email,
      subject: 'Account deleted',
      text: 'Your account has been deleted because of inactivity'
    }

    const result = await transportGmail.sendMail(emailOptions)
    return result

  } catch (error) {
    throw new Error(error.message)
  }
}

export const sendProductDeletedEmail = async (email) => {
  try {

    const emailOptions = {
      from: configs.gmailUser,
      to: email,
      subject: 'Account deleted',
      text: 'Your account has been deleted because of inactivity'
    }

    const result = await transportGmail.sendMail(emailOptions)
    return result

  } catch (error) {
    throw new Error(error.message)
  }
}
