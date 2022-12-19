import { Prisma, PrismaClient, User } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler<User>(async (event) => {
  const body = (await readBody(event)) as Prisma.UserCreateInput
  const data = await prisma.user.create({
    data: body,
  })
  return data
})
