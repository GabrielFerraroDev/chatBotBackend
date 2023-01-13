const { Router } = require('express')
const bots = require('../service/bot')

const router = Router()

router
  .get('/bots', bots.getBots)
  .get('/bots/:id', bots.getBotById)
  .post('/bots', bots.createBot)
  .put('/bots/:id', bots.updateBot)
  .delete('/bots/:id', bots.deleteBot)

module.exports = router
