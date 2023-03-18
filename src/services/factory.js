import { PERSISTENCIA } from '../constants/constants.js'
import configs from '../configs/app.configs.js'
import { UserRepository } from './usersDAOs/users.repository.js'
import { ProductRepository } from './productsDAOs/products.repository.js'
import { CartRepository } from './cartsDAOs/carts.repository.js'

let factory = {}

switch(configs.persistencia) {
  case PERSISTENCIA.MONGO:
    console.log('[factory.js]: 🏭 Mongo persist')
    await import ('../configs/mongo.js')
    // eslint-disable-next-line no-case-declarations
    const { default: usersMongo } = await import('./usersDAOs/users.mongo.dao.js')
    // eslint-disable-next-line no-case-declarations
    const { default: productsMongo } = await import('./productsDAOs/products.mongo.dao.js')
    // eslint-disable-next-line no-case-declarations
    const { default: cartsMongo } = await import('./cartsDAOs/carts.mongo.dao.js')
    factory = {
      users: new UserRepository(usersMongo),
      products: new ProductRepository(productsMongo),
      carts: new CartRepository(cartsMongo)
    }
    break

  case PERSISTENCIA.FILE:
    console.log('[factory.js]: 🏭 File persist')
    // eslint-disable-next-line no-case-declarations
    const { default: usersFile } = await import('./usersDAOs/users.file.dao.js')
    // eslint-disable-next-line no-case-declarations
    const { default: productsFile } = await import('./productsDAOs/products.file.dao.js')
    // eslint-disable-next-line no-case-declarations
    const { default: cartsFile } = await import('./cartsDAOs/carts.file.dao.js')
    factory = {
      users: new UserRepository(usersFile),
      products: new ProductRepository(productsFile),
      carts: new CartRepository(cartsFile)
    }
    break

  case PERSISTENCIA.MYSQL:
    console.log('[factory.js]: 🏭 mysql persist')
    break

  case PERSISTENCIA.MEMORY:
    console.log('[factory.js]: 🏭 memory persist')
    break
}

export default factory