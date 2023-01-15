import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import bodyParser from 'body-parser'
import botRoutes from '../routes/bot'
import messageRoutes from '../routes/message'
import { createMongoConnection } from '../database'
import { appLogger, errorLogger } from '../logger'

createMongoConnection()

const app: express.Application = express()

const port: number = process.env.PORT ? parseInt(process.env.PORT) : 3000

app.disable('etag')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(appLogger)
app.use(errorLogger)

app.use('/', botRoutes)
app.use('/', messageRoutes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

export default app
