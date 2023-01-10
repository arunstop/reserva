import { User } from "~~/types/models/user"

export default defineEventHandler(async(ev)=>{
    const users = await User.find({})
    return {
        data : users
    }
})