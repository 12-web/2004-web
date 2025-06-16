import { ReactNode } from 'react'

export type ChildrenSortProps<DATA> = {
  sortedData: DATA[]
  handleSort: (column: keyof DATA) => void
  sortColumn: keyof DATA | null
  sortOrder: 'asc' | 'desc'
}

export type Props<DATA> = {
  data: DATA[]
  children: (props: ChildrenSortProps<DATA>) => ReactNode
}
