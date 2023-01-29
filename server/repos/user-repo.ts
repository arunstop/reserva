import { Prisma, PrismaClient } from '@prisma/client'

export async function repoUserAdd(data: Prisma.UserCreateInput) {
  const prisma = new PrismaClient()
  return await prisma.user.create({
    data,
  })
}
