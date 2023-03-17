import { PERSISTENCIA } from '../constants/constants.js'
import configs from '../configs/app.configs.js'
import { UserRepository } from './usersDAOs/users.repository.js'

let factory = {}

switch(configs.persistencia) {
  case PERSISTENCIA.MONGO:
    console.log('🏭 Mongo persist')
    await import ('../configs/mongo.js')
    // eslint-disable-next-line no-case-declarations
    const { default: userMongo } = await import('./usersDAOs/users.mongo.dao.js')
    factory = {
      users: new UserRepository(userMongo)
    }
    break

  case PERSISTENCIA.FILE:
    console.log('🏭 File persist')
    // eslint-disable-next-line no-case-declarations
    const { default: userFile } = await import('./usersDAOs/users.file.dao.js')
    factory = {
      users: new UserRepository(userFile)
    }
    break

  case PERSISTENCIA.MYSQL:
    console.log('🏭 mysql persist')
    break

  case PERSISTENCIA.MEMORY:
    console.log('🏭 memory persist')
    break
}

export default factory