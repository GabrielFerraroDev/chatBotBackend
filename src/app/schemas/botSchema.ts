import mongoose, { Schema, Document } from 'mongoose'

export interface Bot extends Document {
  id: string
  name: string
}

const botSchema: Schema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
})

export default mongoose.model<Bot>('Bot', botSchema)
