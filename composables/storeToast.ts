export interface IToast {
  id: string
  title: string
  message: string
  type: 'SUCCESS' | 'ERROR' | 'INFO' | 'PENDING' | null
  duration?: number
  clickToClose?: boolean
  action?: {
    action: () => void
    label: string
  }
}

export const useToast = () =>
  useState<Map<string, IToast>>('toast', () => new Map([]))

export const toastAdd = (toast: Omit<IToast, 'id'>) => {
  useToast().value.set(Date.now() + '', {
    id: Date.now() + '',
    ...toast,
    clickToClose:toast.clickToClose || true,
    duration: toast.duration || 2500,
  })
}

export const toastRemove = (key: string) => {
  useToast().value.delete(key)
}
