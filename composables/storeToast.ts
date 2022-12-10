export interface IToast {
  id: string
  title: string
  message: string
  type: 'SUCCESS' | 'ERROR' | 'INFO' | 'PENDING' | null
  duration?: number
  clickToClose?:boolean
}

export const useToast = () =>
  useState<Map<string, IToast>>('toast', () => new Map([]))

export const toastAdd = (toast: Omit<IToast, 'id'>) => {
  useToast().value.set(Date.now() + '', {
    id: Date.now() + '',
    ...toast,
    duration: toast.duration || 2500,
  })
}

export const toastRemove = (key: string) => {
  useToast().value.delete(key)
}
