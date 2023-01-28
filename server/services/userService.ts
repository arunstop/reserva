import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient()
export async function serviceUserAdd(data: Prisma.UserCreateInput) {
  // mongodb
  // try {
  //   const res = await $fetch('/api/user/register', {
  //     method: 'POST',
  //     body: data,
  //   })
  //   return res
  // } catch (error) {
  //   console.log(error)
  //   return error as string
  // }
  try {
    // create user
    await prisma.user.create({
      data,
    })
    // get user
    const newUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    })
    if (!newUser) throw new Error('Cannot find user')
    return newUser
  } catch (e) {
    console.error(e)
    return null
  }
}
