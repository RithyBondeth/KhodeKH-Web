/** Shared component prop interfaces */

export interface IWithClassName {
  className?: string
}

export interface IWithChildren {
  children: React.ReactNode
}

export interface IWithChildrenAndClassName extends IWithClassName, IWithChildren {}

/** Generic paginated API response shape */
export interface IPaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

/** Base entity fields present on all DB records */
export interface IBaseEntity {
  id: string
  createdAt: string
  updatedAt: string
}
