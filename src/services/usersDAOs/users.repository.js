import FilteredUserDTO from './filteredUser.dto.js'
import UserDTO from './users.dto.js'

export class UserRepository {
  constructor(dao) {
    this.dao = dao
  }

  async getUsers() {
    try {
      const users = await this.dao.getUsers()
      const usersDTO = []
      users.forEach((user) => {
        usersDTO.push(new FilteredUserDTO(user))
      })
      return usersDTO
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getUser(email) {
    try {
      const user = await this.dao.getUser(email)
      const userDTO = new UserDTO(user)
      return userDTO
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getUserById(id) {
    try {
      const user = await this.dao.getUserById(id)
      const userDTO = new UserDTO(user)
      return userDTO
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getUserByCartId(cartId) {
    try {
      const user = await this.dao.getUserByCartId(cartId)
      const userDTO = new UserDTO(user)
      return userDTO
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async createUser(data) {
    try {

      const createdUser = await this.dao.createUser(data)
      const userDTO = new UserDTO(createdUser)
      return userDTO

    } catch (error) {
      throw new Error(error.message)
    }
  }

  async updateUser(email, data, updatePassword = false) {
    try {

      const updatedUser = await this.dao.updateUser(email, data, updatePassword)
      const userDTO = new UserDTO(updatedUser)
      return userDTO

    } catch (error) {
      throw new Error(error.message)
    }
  }
}
