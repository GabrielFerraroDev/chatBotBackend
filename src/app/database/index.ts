import mongoose from 'mongoose'
import { winstonInstance } from '../logger'

const createMongoConnection = (): mongoose.Connection => {
  mongoose.set('strictQuery', true)
  if (process.env.NODE_ENV === 'test') {
    mongoose.connect(
      `mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}_test`
    )
  } else {
    mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`)
  }

  winstonInstance.debug('Conected!')

  return mongoose.connection
}

export { createMongoConnection }
