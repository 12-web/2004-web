import { useMemo } from 'react'
import { default as RowSetterUI } from '@components/RowSetter/RowSetter'
import { Order } from '@store/types/orderApi'
import { OrderRow } from '../OrdersTable/OrdersTable'
import { formatDateFromISO } from '@utils/dates'
import { ChildrenFilterProps } from '@components/Table/FilteredTable/types'

type RowSetterProps = {
  orders: OrderRow[]
  accessor: keyof OrderRow
} & Omit<ChildrenFilterProps<OrderRow>, 'filteredData'>

const RowSetter = ({ orders, ...props }: RowSetterProps) => {
  const { accessor, openedFilter } = props

  const checkboxes = useMemo(() => {
    return orders.map(item => {
      let name

      if (accessor) {
        if (accessor === 'loadStartDate' || accessor === 'creationDate') {
          name = formatDateFromISO(item[accessor])
        } else {
          name = item[accessor]
        }
      }

      return {
        name: name || '(Пусто)',
        value: accessor ? item[accessor]!.toString() : '',
      } as { name: keyof Order; value: string }
    })
  }, [])
  return <RowSetterUI isOpen={openedFilter === accessor} checkboxes={checkboxes} {...props} />
}

export default RowSetter
