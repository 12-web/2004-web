import { ColumnsNameItemProps } from '@components/ColumnsSetter/types'
import { OrderRow } from '@pages/OrderPage/components/OrdersTable/OrdersTable'

export type OrderTable = {
  columns: ColumnsNameItemProps<OrderRow>[] | null
  rows: OrderRow[]
}

export type OrderTableColumns = {
  columns: ColumnsNameItemProps<OrderRow>[] | null
}

export type OrderTableRows = {
  rows: OrderRow[]
}
