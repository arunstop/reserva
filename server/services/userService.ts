import { Prisma } from '@prisma/client'
import { repoUserAdd, repoUserGetByEmail } from '../repos/user-repo'
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

export async function serviceUserLogin(
  data: Pick<Prisma.UserCreateInput, 'email' | 'password'>
) {
  try {
    // get User
    const userTarget = await repoUserGetByEmail(data.email)
    // if not found throw error
    if (!userTarget) throw new Error('User is not found')
    // if password doesn't match throw error
    if (data.password !== userTarget.password) throw new Error('Wrong password')
    // if password match, proceed
    return userTarget
  } catch (e) {
    console.error(e)
    return null
  }
}
