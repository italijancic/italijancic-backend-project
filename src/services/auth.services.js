import * as userServices from './users.services.js'

export const login = async (email, password) => {
  try {

    const user = await userServices.getUser(email)

    if (!user) {
      throw new Error('User does not exist')
    }

    if ( password === user.password ) {
      return true
    } else {
      return false
    }
  } catch (error) {
    throw new Error('Error on login')
  }
}