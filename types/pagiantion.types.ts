export type Pagination<T> = {
  data: T[]
  pagination: {
    total: number
    page: number
    limit: number
    lastPage: number
    hasNextPage: boolean
  }
}