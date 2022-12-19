// export type ServiceResType = "SUCCESS" |"ERROR"
export type ServiceRes<T> = {
  success: boolean
  message: string
  data: T
}
