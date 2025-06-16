import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Order } from '@store/types/orderApi'

interface IOrderData {
  order: Order | null
}

const initialState: IOrderData = {
  order: null,
}

const formStateSlice = createSlice({
  name: 'orderData',
  initialState,
  reducers: {
    setOrder(state: IOrderData, action: PayloadAction<IOrderData>) {
      state.order = action.payload.order
    },
    resetOrder() {
      return initialState
    },
  },
})

export const { setOrder, resetOrder } = formStateSlice.actions
export default formStateSlice.reducer
