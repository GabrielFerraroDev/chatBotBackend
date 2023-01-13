const messageRepository = require('../repositories/messageRepository')

const getMessages = async (req, res) => {
  try {
    const messages = await messageRepository.find()
    res.status(200).json(messages)
  } catch (error) {
    res.status(500).json({ error })
  }
}

const getMessageById = async (req, res) => {
  try {
    const message = await messageRepository.findById(req.params.id)
    if (!message) {
      res.status(404).json({ message: 'Message not found' })
    } else {
      res.status(200).json(message)
    }
  } catch (error) {
    res.status(500).json({ error })
  }
}

const createMessage = async (req, res) => {
  try {
    const message = await messageRepository.create(req.body)
    res.status(201).json(message)
  } catch (error) {
    res.status(400).json({ error })
  }
}

module.exports = {
  getMessages,
  getMessageById,
  createMessage,
}
