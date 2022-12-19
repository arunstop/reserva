import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const data = await prisma.user.create({
    data: {
      email: 'yoag@gmail.com',
      name: 'Yoga',
      phone: '123131231313ffffffffffffffffff',
    },
  })
  return data
})
