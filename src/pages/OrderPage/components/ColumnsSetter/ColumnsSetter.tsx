import { columnsName } from '../OrdersTable/columns'

import { useDispatch } from 'react-redux'
import { setOrderColumns } from '@store/reducers/OrderTable/OrderTableSlice'
import { default as ColumnSetterUI } from '@components/ColumnsSetter/ColumnsSetter'
import { ColumnsNameItemProps } from '@components/ColumnsSetter/types'
import { OrderRow } from '../OrdersTable/OrdersTable'

const ColumnsSetter = () => {
  const dispatсh = useDispatch()

  const handleSetCols = (value: ColumnsNameItemProps<OrderRow>[] | null) =>
    dispatсh(setOrderColumns({ columns: value }))

  return (
    <ColumnSetterUI
      onSetTableCols={handleSetCols}
      cols={Object.values(columnsName).filter(col => col.title)}
    />
  )
}

export default ColumnsSetter
