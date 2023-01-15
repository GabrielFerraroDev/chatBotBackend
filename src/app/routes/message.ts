import { Router } from 'express'
import { getMessages, getMessageById, createMessage } from '../service/message'
import { validateMessage } from '../validator/messageValidator'

const router = Router()

router
  .get('/messages', getMessages)
  .get('/messages/:id', getMessageById)
  .post('/messages', validateMessage, createMessage)

export default router
