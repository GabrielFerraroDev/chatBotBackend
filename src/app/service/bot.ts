import { Request, Response } from 'express'
import { Bot } from '../schemas/botSchema'
import botRepository from '../repositories/botRepository'

export const getBots = async (req: Request, res: Response) => {
  try {
    const bots: Bot[] = await botRepository.find()
    res.status(200).json(bots)
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const getBotById = async (req: Request, res: Response) => {
  try {
    const bot: Bot | null = await botRepository.findById(req.params.id)
    if (!bot) {
      res.status(404).json({ message: 'Bot not found' })
    } else {
      res.status(200).json(bot)
    }
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const createBot = async (req: Request, res: Response) => {
  try {
    const bot: Bot = await botRepository.create(req.body)
    res.status(201).json(bot)
  } catch (error) {
    res.status(400).json({ error })
  }
}

export const updateBot = async (req: Request, res: Response) => {
  try {
    const bot: Bot | null = await botRepository.findByIdAndUpdate(
      req.params.id,
      req.body
    )
    if (!bot) {
      res.status(404).json({ message: 'Bot not found' })
    } else {
      res.status(200).json(bot)
    }
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const deleteBot = async (req: Request, res: Response) => {
  try {
    const bot: any = await botRepository.findByIdAndDelete(req.params.id)
    if (!bot) {
      res.status(404).json({ message: 'Bot not found' })
    } else {
      res.status(204).json({ message: 'Bot deleted' })
    }
  } catch (error) {
    res.status(500).json({ error })
  }
}
