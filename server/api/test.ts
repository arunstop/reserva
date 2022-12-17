import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const data = await prisma.user.findMany()
  return {
    api: data,
  }
})
