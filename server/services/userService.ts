import { Prisma } from '@prisma/client'
import { repoUserAdd } from '../repos/user-repo'
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
    // create user and get user
    const newUser = await repoUserAdd(data)
    if (!newUser) throw new Error('Cannot find user')
    return newUser
  } catch (e) {
    console.error(e)
    return null
  }
}
