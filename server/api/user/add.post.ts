import { Prisma } from '@prisma/client'
import { netFail, netOk } from '~~/server/helper/helper-network'
import { serviceUserAdd } from '~~/server/services/userService'
import { User } from '~~/types/models/user'

export default defineEventHandler(async (event) => {
  // const user = new User({
  //   email: 'string',
  //   password: 'string',
  //   name: 'string',
  //   phone: 'string',
  //   role: 'string',
  //   dateDeleted: 123,
  //   dateCreated: 123,
  //   dateUpdated: 123,
  // })
  // const ou = await user.save()
  // return {
  //   result: ou._id,
  // }

  const body = (await readBody(event)) as Prisma.UserCreateInput

  // const createUser = '123'
  const createUser = await serviceUserAdd(body)
  if (!createUser) {
    return netFail('Failed when creating user')
  }
  return netOk('Success creating user', createUser)
})
