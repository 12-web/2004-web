import { useState, useMemo } from 'react'
import { OpenedFilter, PopoverFilters, PopoverSearch, Props } from './types'

const FilteredTable = <DATA,>({ data, children }: Props<DATA>) => {
  const [filters, setFilters] = useState<Record<keyof DATA, string[]>>(
    {} as Record<keyof DATA, string[]>,
  )

  const [popoverFilters, setPopoverFilters] = useState<PopoverFilters<DATA>>([])

  const [popoverSearch, setPopoverSearch] = useState<PopoverSearch<DATA>>([])

  const [openedFilter, setOpenedFilter] = useState<OpenedFilter>(null)

  const handleFilter = (filterKey: keyof DATA, filterValues: string[]) => {
    setFilters(prevFilters => ({ ...prevFilters, [filterKey]: filterValues }))
  }

  const resetFilters = () => {
    setPopoverSearch([])
    setPopoverFilters([])
    setFilters({} as Record<keyof DATA, string[]>)
  }

  const filteredData = useMemo(() => {
    const filtersKeysList = Object.keys(filters)

    return data.filter(item => {
      return filtersKeysList.every(key => {
        const filterKey = key as keyof DATA

        if (filters[filterKey].length === 0) return true

        return filters[filterKey].some(filterValue => filterValue === item[filterKey])
      })
    })
  }, [data, filters])

  return (
    <>
      {children({
        filteredData,
        handleFilter,
        openedFilter,
        setOpenedFilter,
        popoverFilters,
        setPopoverFilters,
        popoverSearch,
        setPopoverSearch,
        resetFilters,
      })}
    </>
  )
}

export default FilteredTable
