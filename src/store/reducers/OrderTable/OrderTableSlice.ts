import { columnsName } from '@pages/OrderPage/components/OrdersTable/columns'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { OrderTable, OrderTableColumns, OrderTableRows } from './types'
import { OrderRow } from '@pages/OrderPage/components/OrdersTable/OrdersTable'

const initialState: OrderTable = {
  columns: Object.values(columnsName).filter(col => col.title),
  rows: [],
}

const formStateSlice = createSlice({
  name: 'orderTable',
  initialState,
  reducers: {
    setOrderColumns(state: OrderTableColumns, action: PayloadAction<OrderTableColumns>) {
      state.columns = action.payload.columns
    },
    setOrderRows(state: OrderTableRows, action: PayloadAction<OrderRow[]>) {
      state.rows = action.payload
    },
    resetOrder() {
      return initialState
    },
  },
})

export const { setOrderColumns, setOrderRows, resetOrder } = formStateSlice.actions
export default formStateSlice.reducer
