import PaginatedTable from '@components/Table/PaginatedTable'
import SortedTable from '@components/Table/SortedTable'
import FilteredTable from '@components/Table/FilteredTable'
import { ReactNode } from 'react'
import { ChildrenSortProps } from '../SortedTable/types'
import { ChildrenFilterProps } from '../FilteredTable/types'
import { ChildrenPaginatedProps } from '../PaginatedTable/types'

type ChildrenCombinedProps<DATA> = ChildrenSortProps<DATA> &
  ChildrenFilterProps<DATA> &
  ChildrenPaginatedProps<DATA>

type CombinedTableProps<DATA> = {
  data?: DATA[]
  children: (props: ChildrenCombinedProps<DATA>) => ReactNode
  visiblePagCount?: number
  isLoading?: boolean
  onSetRows?: (data: DATA[]) => void
  paginationClass?: string
}

const CombinedTable = <DATA,>({
  data = [],
  children,
  visiblePagCount,
  isLoading,
  onSetRows,
  paginationClass,
}: CombinedTableProps<DATA>) => {
  return (
    <FilteredTable data={data}>
      {filteredProps => (
        <SortedTable data={filteredProps.filteredData}>
          {sortedProps => (
            <PaginatedTable
              paginationClass={paginationClass}
              onSetRows={onSetRows}
              isLoading={isLoading}
              data={sortedProps.sortedData}
              visiblePagCount={visiblePagCount}>
              {paginatedProps => children({ ...filteredProps, ...sortedProps, ...paginatedProps })}
            </PaginatedTable>
          )}
        </SortedTable>
      )}
    </FilteredTable>
  )
}

export default CombinedTable
