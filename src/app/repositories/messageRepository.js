const Message = require('../schemas/messageSchema')

const find = () => {
  return Message.find()
}

const findById = (id) => {
  return Message.findOne({ id: id })
}

const findByConversationId = (conversationId) => {
  return Message.find({ conversationId: conversationId })
}

const create = (message) => {
  return Message.create(message)
}

const findByIdAndDelete = (id) => {
  return Message.deleteOne({ id: id })
}
const clearDatabase = async () => {
  await Message.deleteMany({})
}

module.exports = {
  find,
  findById,
  findByConversationId,
  create,
  findByIdAndDelete,
  clearDatabase,
}
