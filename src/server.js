import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { schema } from './schema'
import expressGraphQL from 'express-graphql'
import logger from 'custom-logger'


const start = () => {
  dotenv.config()

  const PORT = process.env.PORT || 3002
  const app = express()

  app.use(morgan('dev'))

  try {
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
    logger.info('mongo connected succesfully')
  } catch (err) {
    logger.debug('application could not connect to mongo')
    throw err
  }

  app.post('/graphql', expressGraphQL({
    schema,
    graphiql: false
  }))

  app.get('/graphql', expressGraphQL({
    schema,
    graphiql: true
  }))

  app.listen(PORT, () => console.log(`server running on port *${PORT}`))
}

try {
  start()
  logger.info('application started successfully')
} catch (err) {
  logger.error('error occured when during application start up')
  throw error
}
