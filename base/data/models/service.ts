export interface IAuthProps {
    email: string
    password: string
}

export interface IServiceParams<T_DATA, T_CALLBACK> {
    data: T_DATA
    callback?: (resp: T_CALLBACK) => T_DATA
}

export type IStatus = 'loading' | 'success' | 'error' | 'empty'

export interface IServiceResponse<T_DATA = null> {
    status: IStatus
    message: string
    data: T_DATA
}

export const serviceError = <T = null>(
    message: string,
    data?: T | null
): IServiceResponse<T | null> => {
    return {
        status: 'error',
        message: message,
        data: data ?? null,
    }
}

export const serviceSuccess = <T>(
    message: string,
    data: T
): IServiceResponse<T> => {
    return {
        status: 'success',
        message: message,
        data: data,
    }
}

export const serviceLoading = (message: string): IServiceResponse => {
    return {
        status: 'error',
        message: message,
        data: null,
    }
}

export const serviceEmpty = (message: string): IServiceResponse => {
    return {
        status: 'empty',
        message: message,
        data: null,
    }
}
