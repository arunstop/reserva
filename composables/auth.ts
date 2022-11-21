import { serviceError } from './../base/data/models/service'
import {
    IServiceParams,
    IAuthProps,
    IServiceResponse,
} from '~~/base/data/models/service'

export const useUser = () => useSupabaseUser()

export async function serviceAuthSignUp({
    data,
    callback,
}: IServiceParams<IAuthProps, IServiceResponse<IAuthProps | null>>) {
    console.log(data)
    try {
        const { email, password } = data
        const client = useSupabaseClient()

        const { data: user, error } = await client.auth.signUp({
            email: email,
            password: password,
        })

        if (error) {
            throw new Error(`${error.name} - ${error.message}`)
        }
        if (!user.user) {
            throw new Error(`Register error`)
        }
        return user.user
    } catch (error) {
        console.log(error)
        callback?.(serviceError(error as string))
        return null
    }
}

export async function serviceAuthSignIn({
    data,
    callback,
}: IServiceParams<IAuthProps, IServiceResponse<IAuthProps | null>>) {
    console.log(data)
    try {
        const { email, password } = data
        const client = useSupabaseClient()

        const { data: user, error } = await client.auth.signInWithPassword({
            email: email,
            password: password,
        })

        if (error) {
            throw new Error(`${error.name} - ${error.message}`)
        }
        if (!user.user) {
            throw new Error(`Register error`)
        }
        return user.user
    } catch (error) {
        console.log(error)
        callback?.(serviceError(error as string))
        return null
    }
}

export async function serviceAuthSignOut({
    data,
    callback,
}: IServiceParams<boolean, IServiceResponse<boolean | null>>) {
    try {
        console.log(data);
        const client = useSupabaseClient()
        const { error } = await client.auth.signOut()
        if (error) {
            throw `${error.name} - ${error.message}`
        }
        return true
    } catch (error) {
        console.log(error)
        callback?.(serviceError(error as string))
        return null
    }
}
