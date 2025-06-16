import { ReactNode } from 'react'

export type ChildrenFilterProps<DATA> = {
  filteredData: DATA[]
  handleFilter: (filterKey: keyof DATA, filterValue: string[]) => void
  openedFilter: OpenedFilter
  setOpenedFilter: (openedFilter: OpenedFilter) => void
  popoverFilters: PopoverFilters<DATA>
  setPopoverFilters: (popoverFilters: PopoverFilters<DATA>) => void
  popoverSearch: PopoverSearch<DATA>
  setPopoverSearch: (popoverSearch: PopoverSearch<DATA>) => void
  resetFilters: VoidFunction
}

export type Props<DATA> = {
  data: DATA[]
  children: (props: ChildrenFilterProps<DATA>) => ReactNode
}

export type OpenedFilter = string | null

export type PopoverFilters<DATA> = { name: keyof DATA; value: string }[]

export type PopoverSearch<DATA> = { name: keyof DATA; value: string }[]
