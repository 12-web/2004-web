import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Asn } from '@store/types/asnApi'

interface IAsnData {
  asn: Asn | null
}

const initialState: IAsnData = {
  asn: null,
}

const formStateSlice = createSlice({
  name: 'AsnData',
  initialState,
  reducers: {
    setAsn(state: IAsnData, action: PayloadAction<IAsnData>) {
      state.asn = action.payload.asn
    },
    resetAsn() {
      return initialState
    },
  },
})

export const { setAsn, resetAsn } = formStateSlice.actions
export default formStateSlice.reducer
