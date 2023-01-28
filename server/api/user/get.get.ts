// import { User } from "~~/types/models/user"

import { PrismaClient } from "@prisma/client"

export default defineEventHandler(async(ev)=>{
    const prisma = new PrismaClient()
    const users = await prisma.user.findMany()
    return {
        data : users
    }
})