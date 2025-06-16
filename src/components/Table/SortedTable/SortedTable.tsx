import { useState, useMemo } from 'react'
import { Props } from './types'

const SortedTable = <DATA,>({ data, children }: Props<DATA>) => {
  const [sortColumn, setSortColumn] = useState<keyof DATA | null>(null)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  const handleSort = (column: keyof DATA) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortOrder('asc')
    }
  }

  const sortedData = useMemo(() => {
    if (!sortColumn) return data

    return [...data].sort((a, b) => {
      if (a[sortColumn] < b[sortColumn]) return sortOrder === 'asc' ? -1 : 1
      if (a[sortColumn] > b[sortColumn]) return sortOrder === 'asc' ? 1 : -1
      return 0
    })
  }, [data, sortColumn, sortOrder])

  return children({ sortedData, handleSort, sortColumn, sortOrder })
}

export default SortedTable
