const mongoose = require('mongoose')

const botSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
})

module.exports = mongoose.model('Bot', botSchema)
