export interface Result<T> {
  code: number
  obj: T
  msg: string
}

export interface PageResult<T> {
  total: number
  list: T
}
