import bcrypt from 'bcrypt'
import { User } from '../models/User.model.js'
import cartServices from '../services/carts.mongo.services.js'

export const createUser = async (data) => {
  try {
    const foundedUser = await getUser(data.email)

    if (foundedUser) {
      throw new Error('User Already exist')
    } else {
      // Create a new cart for this new user
      const createdCart = await cartServices.createCart()
      const newUser = { ...data, cartId: createdCart._id }
      // password encrypt
      newUser.password = bcrypt.hashSync(newUser.password, bcrypt.genSaltSync(10))
      const createdUser = await User.create(newUser)
      return createdUser
    }

  } catch (error) {
    throw new Error(error.message)
  }
}

export const getUser = async (email) => {
  try {
    const user = await User.findOne({ email: email }).lean()
    return user
  } catch (error) {
    throw new Error('Error searching user')
  }
}

export const updateUser = async (email, data, updatePassword=false) => {
  try {
    const user = await getUser(email)

    if (user) {

      if (data.password) {
        if (updatePassword) {
          data.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(10))
        } else {
          delete data.password
        }
      }

      const updatedUser = await User.findOneAndUpdate({ email }, { ...data }, {new: true}).lean()
      return updatedUser
    }

  } catch (error) {
    throw new Error(error.message)
  }
}