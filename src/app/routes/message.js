const { Router } = require('express')
const messages = require('../service/message')

const router = Router()

router
  .get('/messages', messages.getMessages)
  .get('/messages/:id', messages.getMessageById)
  .post('/messages', messages.createMessage)

module.exports = router
