import { Router } from 'express'
import { getMessages, getMessageById, createMessage } from '../service/message'

const router = Router()

router
  .get('/messages', getMessages)
  .get('/messages/:id', getMessageById)
  .post('/messages', createMessage)

export default router
