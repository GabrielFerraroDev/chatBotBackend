import { Router } from 'express'
import {
  getBots,
  getBotById,
  createBot,
  updateBot,
  deleteBot,
} from '../service/bot'


const router = Router()

router
  .get('/bots', getBots)
  .get('/bots/:id', getBotById)
  .post('/bots', createBot)
  .put('/bots/:id', updateBot)
  .delete('/bots/:id', deleteBot)

export default router
