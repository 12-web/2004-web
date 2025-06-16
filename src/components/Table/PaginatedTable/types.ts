import { PaginationProps } from '@consta/uikit/__internal__/src/components/Pagination/types'
import { HTMLAttributes, ReactNode } from 'react'

export type ChildrenPaginatedProps<DATA> = {
  paginatedData: DATA[]
  totalPages: number
  page: number
  itemsPerPage: number
  setPage: (page: number) => void
  setItemsPerPage: (itemsPerPage: number) => void
}

export type Props<DATA> = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  data: DATA[]
  children: (props: ChildrenPaginatedProps<DATA>) => ReactNode
  visiblePagCount?: number
  isLoading?: boolean
  onSetRows?: (data: DATA[]) => void
  paginationClass?: string
}

export type Component = <DA>(props: Props<DA>) => ReactNode
