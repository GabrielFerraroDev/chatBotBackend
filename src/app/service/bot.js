const botRepository = require('../repositories/botRepository')

const getBots = async (req, res) => {
  try {
    const bots = await botRepository.find()
    res.status(200).json(bots)
  } catch (error) {
    res.status(500).json({ error })
  }
}

const getBotById = async (req, res) => {
  try {
    const bot = await botRepository.findById(req.params.id)
    if (!bot) {
      res.status(404).json({ message: 'Bot not found' })
    } else {
      res.status(200).json(bot)
    }
  } catch (error) {
    res.status(500).json({ error })
  }
}

const createBot = async (req, res) => {
  try {
    const bot = await botRepository.create(req.body)
    res.status(201).json(bot)
  } catch (error) {
    res.status(400).json({ error })
  }
}

const updateBot = async (req, res) => {
  try {
    const bot = await botRepository.findByIdAndUpdate(req.params.id, req.body)
    if (!bot) {
      res.status(404).json({ message: 'Bot not found' })
    } else {
      res.status(200).json(bot)
    }
  } catch (error) {
    res.status(500).json({ error })
  }
}

const deleteBot = async (req, res) => {
  try {
    const bot = await botRepository.findByIdAndDelete(req.params.id)
    if (!bot) {
      res.status(404).json({ message: 'Bot not found' })
    } else {
      res.status(200).json({ message: 'Bot deleted' })
    }
  } catch (error) {
    res.status(500).json({ error })
  }
}

module.exports = {
  getBots,
  getBotById,
  createBot,
  updateBot,
  deleteBot,
}
