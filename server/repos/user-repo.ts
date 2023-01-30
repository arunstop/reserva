import { Prisma, PrismaClient } from '@prisma/client'

export function prismaInit (){
  return new PrismaClient()
}

export async function repoUserAdd(data: Prisma.UserCreateInput) {
  return await prismaInit().user.create({
    data,
  })
}

export async function repoUserGetByEmail(email:string){
  if(!email) return null
  return await prismaInit().user.findFirst({
    where:{
      email:email
    }
  })
}
