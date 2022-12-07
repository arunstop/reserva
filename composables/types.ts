export interface IPost {
  userId: string
  id: number
  title: string
  completed: boolean
  body: string
}

export interface IComment {
  postId: number
  id: number
  name: string
  email: string
  body: string
}

export interface IOrder {
  id: string
  name: string
  qty: number
  stock: number
  edited?: boolean
}
