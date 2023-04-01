import { Router } from 'express'

import { STATUS } from '../constants/constants.js'
import logger from '../utils/logger.utils.js'

const router = Router()

router.get('/', (req, res) => {

  logger.fatal('FATAL logger level testing')
  logger.error('ERROR logger level testing')
  logger.warning('WARNING logger level testing')
  logger.info('INFO logger level testing')
  logger.http('HTTP logger level testing')
  logger.debug('DEBUG logger level testing')

  res.status(200).json({
    status: STATUS.SUCCESS
  })
})

export default router