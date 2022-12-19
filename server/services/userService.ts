import { Prisma } from '@prisma/client'
export async function serviceUserAdd(data: Prisma.UserCreateInput) {
  try {
    const res = await $fetch('/api/user/register', {
      method: 'POST',
      body: data,
    })
    return res
  } catch (error) {
    console.log(error)
    return error as string
  }
}
