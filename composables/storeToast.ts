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
  noHover?:boolean
}

export const useToast = () =>
  useState<Map<string, IToast>>('toast', () => new Map([]))

export const toastAdd = (toast: Omit<IToast, 'id'> & { id?: string }) => {
  const id = toast.id || Date.now() + ''
  useToast().value.set(id, {
    clickToClose: true,
    ...toast,
    id: id,
    duration: toast.duration || 2500,
  })
}

export const toastRemove = (key: string) => {
  useToast().value.delete(key)
}
