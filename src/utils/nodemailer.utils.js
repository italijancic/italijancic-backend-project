import { createTransport } from 'nodemailer'

import configs from '../configs/app.configs.js'
import jwtUtils from './jwt.utils.js'

export const sendEmail = async (email) => {
  try {

    const token = jwtUtils.generateToken(email)
    const expirationDate = jwtUtils.getExpirationDate(token)

    const transportGamil = createTransport({
      service: 'gmail',
      port: 587,
      auth: {
        user: configs.gmailUser,
        pass: configs.gmailAppPass
      }
    })

    const emailOptions = {
      from: configs.gmailUser,
      to: email,
      subject: 'Yout link for password restoration',
      text: `Use the following link to access the secret page before ${expirationDate}: http://localhost:${configs.port}/password-restore?token=${token}`
    }

    const result = await transportGamil.sendMail(emailOptions)
    return result

  } catch (error) {
    throw new Error(error.message)
  }
}