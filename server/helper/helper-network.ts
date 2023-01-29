export interface TNetRes<DATA = undefined> {
  data: DATA
  message: string
  ok: boolean
}

export function netOk<T = undefined>(message: string, data: T): TNetRes<T> {
  return {
    data,
    message,
    ok: true,
  }
}

export function netFail(message: string): TNetRes {
  return {
    data: undefined,
    message,
    ok: false,
  }
}
