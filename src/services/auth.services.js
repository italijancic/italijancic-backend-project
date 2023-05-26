import bcrypt from 'bcrypt'

import factory from '../services/factory.js'

export const login = async (email, password) => {
  try {

    // const user = await userServices.getUser(email)
    const user = await factory.users.getUser(email)

    if (!user) {
      throw new Error('User does not exist')
    }

    // Generate has from string password and compare with stored hash
    const isValid = bcrypt.compareSync(password, user.password)

    if ( isValid ) {
      user.lastConecction = new Date()
      await factory.users.updateUser(email, user)
      return true
    } else {
      return false
    }
  } catch (error) {
    throw new Error('Error on login')
  }
}