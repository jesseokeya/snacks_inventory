import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { schema } from './schema'
import expressGraphQL from 'express-graphql'
import winston from 'winston'


const start = () => {
  dotenv.config()

  const PORT = process.env.PORT || 3002
  const app = express()

  app.use(morgan('dev'))

  try {
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
  } catch (err) {
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
} catch (err) {
  throw err
}
