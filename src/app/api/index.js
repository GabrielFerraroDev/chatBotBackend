require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const botRoutes = require('../routes/bot')
const messageRoutes = require('../routes/message')

const { createMongoConnection } = require('../database')
createMongoConnection()

const app = express()
const port = process.env.PORT || 3000

app.disable('etag')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', botRoutes)
app.use('/', messageRoutes)

app.listen(port, () => {
  console.log('Server is running on port 3000')
})
module.exports = app
