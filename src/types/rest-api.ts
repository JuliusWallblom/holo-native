export interface RESTResponse<T> {
  data: T
  message?: string
}

export interface RESTError {
  message: string
  code?: string
}
