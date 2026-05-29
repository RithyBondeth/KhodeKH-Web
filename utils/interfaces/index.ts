/** Shared component prop interfaces */

export interface WithClassName {
  className?: string
}

export interface WithChildren {
  children: React.ReactNode
}

export interface WithChildrenAndClassName extends WithClassName, WithChildren {}

/** Generic paginated API response shape */
export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

/** Base entity fields present on all DB records */
export interface BaseEntity {
  id: string
  createdAt: string
  updatedAt: string
}
