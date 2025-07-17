import logger from './logger.js'
import jwt from 'jsonwebtoken'
import config from '../utils/config.js'

export const requestLogger = (request, _response, next) => {
  logger.info('Method: ', request.method)
  logger.info('Path: ', request.path)
  logger.info('Body: ', request.body)
  logger.info('---------')
  next()
}

export const tokenExtractor = (req, res, next) => {
  const authorization = req.headers.authorization
  if (authorization?.toLowerCase().startsWith('bearer ')) {
    const providedToken = authorization.substring(7)

    const decodedToken = jwt.verify(providedToken ?? '', config.JWT_SECRET)

    if (!decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }

    req.token = providedToken
    next()
  }
  else {
    res.status(401).json({ error: 'token missing or invalid' })
  }
}
