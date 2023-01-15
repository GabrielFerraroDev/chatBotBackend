import mongoose, { Schema, Document } from 'mongoose'

export interface Message extends Document {
  id: string
  conversationId: string
  timestamp: Date
  from: string
  to: string
  text: string
}

const messageSchema: Schema = new mongoose.Schema({
  id: { type: String, required: true },
  conversationId: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  from: { type: String, required: true },
  to: { type: String, required: true },
  text: { type: String, required: true },
})

export default mongoose.model<Message>('Message', messageSchema)
