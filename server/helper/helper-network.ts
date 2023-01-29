export interface TNetRes<DATA> {
  data: DATA
  message: string
  ok: boolean
}

export function netOk<T = unknown>(data: T, message: string): TNetRes<T> {
  return {
    data,
    message,
    ok: true,
  }
}

export function netFail<T = unknown>(data: T, message: string): TNetRes<T> {
  return {
    data,
    message,
    ok: false,
  }
}
