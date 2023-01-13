const Bot = require('../schemas/botSchema')

const find = () => {
  return Bot.find()
}

const findById = (id) => {
  return Bot.find({ id: id }).exec()
}

const findByIdAndUpdate = (id, data) => {
  return Bot.updateOne({ id: id }, data)
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
