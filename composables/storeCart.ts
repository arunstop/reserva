import { IOrder } from './types'

export const useCart = () =>
  useState<Map<string, IOrder>>('cart', () => new Map())
  
export function cartAdd(order: [string, IOrder]) {
  useCart().value.set(...order)
}

export function cartRemove(key: string) {
  useCart().value.delete(key)
}
