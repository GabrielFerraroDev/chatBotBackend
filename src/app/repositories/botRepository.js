const Bot = require('../schemas/botSchema')

const find = () => {
  return Bot.find()
}

const findById = (id) => {
  return Bot.findOne({ id: id })
}

const findByIdAndUpdate = (id, data) => {
  return Bot.findOneAndUpdate({ id: id }, data, { new: true })
}

const findByIdAndDelete = (id) => {
  return Bot.deleteOne({ id: id })
}

const create = (bot) => {
  return Bot.create(bot)
}

module.exports = {
  find,
  findById,
  findByIdAndUpdate,
  findByIdAndDelete,
  create,
}
