const Message = require('../schemas/messageSchema')

const find = () => {
  return Message.find()
}

const findById = (id) => {
  return Message.find({ id: id }).exec()
}

const findByConversationId = (conversationId) => {
  return Message.find({ conversationId: conversationId })
}

const create = (message) => {
  return Message.create(message)
}

module.exports = {
  find,
  findById,
  findByConversationId,
  create,
}
