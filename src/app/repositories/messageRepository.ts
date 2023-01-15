import MessageSchema from '../schemas/messageSchema'

const find = (): Promise<any> => {
  return MessageSchema.find().exec()
}

const findById = (id: string): Promise<any> => {
  return MessageSchema.findOne({ id }).exec()
}

const findByConversationId = (conversationId: string): Promise<any> => {
  return MessageSchema.find({ conversationId }).exec()
}

const create = (message: object): Promise<any> => {
  return MessageSchema.create(message)
}

const findByIdAndDelete = (id: string): Promise<any> => {
  return MessageSchema.deleteOne({ id }).exec()
}

const clearDatabase = async (): Promise<void> => {
  await MessageSchema.deleteMany({})
}

export default {
  find,
  findById,
  findByConversationId,
  create,
  findByIdAndDelete,
  clearDatabase,
}
