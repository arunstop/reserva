import { User } from "~~/types/models/user"


export default defineEventHandler(async (event) => {
  const user = new User({
    email: 'string',
    password: 'string',
    name: 'string',
    phone: 'string',
    role: 'string',
    dateDeleted: 123,
    dateCreated: 123,
    dateUpdated: 123,
  })
  const ou = await user.save()
  return {
    result: ou._id,
  }
})
