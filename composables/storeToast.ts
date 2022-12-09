export interface IToast {
  id: string
  title: string
  message: string
  type: 'SUCCESS' | 'ERROR' | 'INFO' | 'PENDING' | null
  duration?: number
}
export const useToast = () =>
  useState<Map<string, IToast>>('toast', () => new Map([]))

export const toastAdd = (toast: Omit<IToast, 'id'>) => {
  useToast().value.set(Date.now() + '', {
    id: Date.now() + '',
    title: toast.title,
    message: toast.message,
    type: toast.type,
    duration: toast.duration || 2500,
  })
}

export const toastRemove = (key: string) => {
  useToast().value.delete(key)
}
