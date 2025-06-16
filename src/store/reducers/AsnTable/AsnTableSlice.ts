import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AsnTable, AsnTableColumns } from './types'
import { columnsName } from '@pages/AsnPage/components/AsnTable/columns'
import { AsnRow } from '@pages/AsnPage/components/AsnTable/AsnTable'

const initialState: AsnTable = {
  columns: Object.values(columnsName).filter(col => col.title),
  rows: [],
}

const formStateSlice = createSlice({
  name: 'astTable',
  initialState,
  reducers: {
    setAsnColumns(state: AsnTable, action: PayloadAction<AsnTableColumns>) {
      state.columns = action.payload.columns
    },
    setAsnRows(state: AsnTable, action: PayloadAction<AsnRow[]>) {
      state.rows = action.payload
    },
    resetAsnTable() {
      return initialState
    },
  },
})

export const { setAsnColumns, setAsnRows, resetAsnTable } = formStateSlice.actions
export default formStateSlice.reducer
