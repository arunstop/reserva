import { Prisma } from '@prisma/client'
import { netFail, netOk } from '~~/server/helper/helper-network'
import {
  serviceUserAdd,
  serviceUserLogin,
} from '~~/server/services/userService'
import { User } from '~~/types/models/user'

export default defineEventHandler(async (event) => {
  const requestBody = (await readBody(event)) as Pick<
    Prisma.UserCreateInput,
    'email' | 'password'
  >

  // const createUser = '123'
  const validCredentials = await serviceUserLogin(requestBody)
  if (!validCredentials.ok) {
    return netFail(validCredentials.message)
  }
  return netOk(validCredentials.message, validCredentials.data)
})
