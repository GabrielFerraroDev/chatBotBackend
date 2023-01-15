import mongoose from 'mongoose'

const createMongoConnection = (): mongoose.Connection => {
  if (process.env.NODE_ENV === 'test') {
    mongoose.connect(
      `mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}_test`
    )
  } else {
    mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`)
  }

  console.log('Conected!')

  return mongoose.connection
}

export { createMongoConnection }
