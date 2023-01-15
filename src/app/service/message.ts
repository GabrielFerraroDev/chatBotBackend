import { Request, Response } from 'express'

import messageRepository from '../repositories/messageRepository'

export const getMessages = async (req: Request, res: Response) => {
  try {
    const conversationId: string = (req.query.conversationId as string) || ''

    if (conversationId) {
      const messages = await messageRepository.findByConversationId(
        conversationId
      )
      res.status(200).json(messages)
    } else {
      const messages = await messageRepository.find()
      res.status(200).json(messages)
    }
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const getMessageById = async (req: Request, res: Response) => {
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

export const createMessage = async (req: Request, res: Response) => {
  try {
    const message = await messageRepository.create(req.body)
    res.status(201).json(message)
  } catch (error) {
    res.status(400).json({ error })
  }
}
