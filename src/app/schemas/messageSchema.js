const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
  conversationId: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  from: { type: String, required: true },
  to: { type: String, required: true },
  text: { type: String, required: true },
})

module.exports = mongoose.model('Message', messageSchema)
