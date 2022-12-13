import { IOrder } from './types'

export type ICartItem = Map<string, IOrder>
export type ICartState = Map<string, ICartItem>

export const useCart = () => useState<ICartState>('cart', () => new Map())

export function cartAdd(key: string, newItem: ICartItem) {
  useCart().value.set(key, newItem)
}

export function cartRemove(key: string) {
  useCart().value.delete(key)
}

export function cartClear() {
  useCart().value.clear()
}
