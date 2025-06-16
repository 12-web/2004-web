import { useMemo } from 'react'
import { default as RowSetterUI } from '@components/RowSetter/RowSetter'
import { ChildrenFilterProps } from '@components/Table/FilteredTable/types'

type RowSetterProps<DATA> = {
  items?: DATA[]
  accessor: keyof DATA
} & Omit<ChildrenFilterProps<DATA>, 'filteredData'>

const CommonRowSetter = <DATA,>({ items = [], ...props }: RowSetterProps<DATA>) => {
  const { accessor, openedFilter } = props

  const checkboxes = useMemo(() => {
    return items.map(item => {
      return {
        name: String(item[accessor]) || '(Пусто)',
        value: accessor ? item[accessor] : '',
      } as { name: keyof DATA; value: string }
    })
  }, [items])

  return <RowSetterUI isOpen={openedFilter === accessor} checkboxes={checkboxes} {...props} />
}

export default CommonRowSetter
