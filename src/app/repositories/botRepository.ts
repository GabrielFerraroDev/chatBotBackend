import BotSchema from '../schemas/botSchema'

const find = (): Promise<any> => {
  return BotSchema.find().exec()
}

const findById = (id: string): Promise<any> => {
  return BotSchema.findOne({ id }).exec()
}

const findByIdAndUpdate = (id: string, data: object): Promise<any> => {
  return BotSchema.findOneAndUpdate({ id }, data, { new: true }).exec()
}

const findByIdAndDelete = (id: string): Promise<any> => {
  return BotSchema.deleteOne({ id }).exec()
}

const create = (bot: object): Promise<any> => {
  return BotSchema.create(bot)
}

const clearDatabase = async (): Promise<void> => {
  await BotSchema.deleteMany({})
}

export default {
  find,
  findById,
  findByIdAndUpdate,
  findByIdAndDelete,
  create,
  clearDatabase,
}
