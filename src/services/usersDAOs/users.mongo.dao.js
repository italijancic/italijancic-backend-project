import bcrypt from 'bcrypt'

import { User } from '../../models/User.model.js'
import cartModel  from '../../models/Cart.model.js'

class UserMongo {
  constructor(userModel, cartModel) {
    this.user = userModel
    this.cart = cartModel
  }

  async getUser(email) {
    try {
      const user = await this.user.findOne({ email: email }).lean()
      if (!user) {
        throw new Error('Error searching user')
      }
      return user
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getUserByCartId(cartId) {
    try {
      const user = await this.user.findOne({ cartId: cartId }).lean()
      return user
    } catch (error) {
      throw new Error('Error searching user')
    }
  }

  async createUser(data) {
    try {
      const foundedUser = await this.getUser(data.email)

      if (foundedUser) {
        throw new Error('User Already exist')
      } else {
        // Create a new cart for this new user
        const createdCart = await this.cart.create({})
        const newUser = { ...data, cartId: createdCart._id }
        // password encrypt
        newUser.password = bcrypt.hashSync(newUser.password, bcrypt.genSaltSync(10))
        const createdUser = await this.user.create(newUser)
        return createdUser
      }

    } catch (error) {
      throw new Error(error.message)
    }
  }

  async updateUser(email, data, updatePassword = false) {
    try {
      const user = await this.getUser(email)

      if (user) {

        if (data.password) {
          if (updatePassword) {
            data.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(10))
          } else {
            delete data.password
          }
        }

        const updatedUser = await this.user.findOneAndUpdate({ email }, { ...data }, { new: true }).lean()
        return updatedUser
      }

    } catch (error) {
      throw new Error(error.message)
    }
  }
}

export default new UserMongo(User, cartModel)