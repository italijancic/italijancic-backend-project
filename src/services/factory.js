import { PERSISTENCIA } from '../constants/constants.js'
import configs from '../configs/app.configs.js'
import { UserRepository } from './usersDAOs/users.repository.js'
import { ProductRepository } from './productsDAOs/products.repository.js'
import { CartRepository } from './cartsDAOs/carts.repository.js'
import { TicketRepository } from './ticketsDAOs/tickets.repository.js'

import logger from '../utils/logger.utils.js'

let factory = {}

switch(configs.persistencia) {
  case PERSISTENCIA.MONGO:
    logger.info('[factory.js]: 🏭 Mongo persist')
    await import ('../configs/mongo.js')
    // eslint-disable-next-line no-case-declarations
    const { default: usersMongo } = await import('./usersDAOs/users.mongo.dao.js')
    // eslint-disable-next-line no-case-declarations
    const { default: productsMongo } = await import('./productsDAOs/products.mongo.dao.js')
    // eslint-disable-next-line no-case-declarations
    const { default: cartsMongo } = await import('./cartsDAOs/carts.mongo.dao.js')
    // eslint-disable-next-line no-case-declarations
    const { default: ticketsMongo } = await import('./ticketsDAOs/tickets.mongo.dao.js')
    factory = {
      users: new UserRepository(usersMongo),
      products: new ProductRepository(productsMongo),
      carts: new CartRepository(cartsMongo),
      tickets: new TicketRepository(ticketsMongo)
    }
    break

  case PERSISTENCIA.FILE:
    logger.info('[factory.js]: 🏭 File persist')
    // eslint-disable-next-line no-case-declarations
    const { default: usersFile } = await import('./usersDAOs/users.file.dao.js')
    // eslint-disable-next-line no-case-declarations
    const { default: productsFile } = await import('./productsDAOs/products.file.dao.js')
    // eslint-disable-next-line no-case-declarations
    const { default: cartsFile } = await import('./cartsDAOs/carts.file.dao.js')
    // eslint-disable-next-line no-case-declarations
    const { default: ticketsFile } = await import('./ticketsDAOs/tickets.file.dao.js')
    factory = {
      users: new UserRepository(usersFile),
      products: new ProductRepository(productsFile),
      carts: new CartRepository(cartsFile),
      tickets: new TicketRepository(ticketsFile)
    }
    break

  case PERSISTENCIA.MYSQL:
    logger.info('[factory.js]: 🏭 mysql persist')
    break

  case PERSISTENCIA.MEMORY:
    logger.info('[factory.js]: 🏭 memory persist')
    break
}

export default factory