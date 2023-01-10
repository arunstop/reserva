import { Schema, model } from 'mongoose'

export interface IUser {
  email: string
  password: string
  name: string
  phone: string
  role: string
  dateDeleted: number
  dateCreated: number
  dateUpdated: number
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, required: true },
  dateDeleted: { type: Number, required: true },
  dateCreated: { type: Number, required: true },
  dateUpdated: { type: Number, required: true },
})

export const User = model<IUser>('User', userSchema)