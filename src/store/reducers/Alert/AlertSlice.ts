import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SnackBarType } from '@shared/Alert/Alert'

type AlertStateProps = {
  items: SnackBarType[]
}

const initialState: AlertStateProps = {
  items: [],
}

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    opened: {
      reducer: (state: AlertStateProps, action: PayloadAction<SnackBarType>) => {
        state.items.push({ ...action.payload })
      },
      prepare: ({ message, status = 'alert' }: Omit<SnackBarType, 'key'>) => {
        return { payload: { key: Date.now(), message, status } }
      },
    },
    closed(state: AlertStateProps, action: PayloadAction<SnackBarType>) {
      state.items = state.items.filter(item => item.key !== action.payload.key)
    },
  },
})

export const { opened, closed } = alertSlice.actions
export default alertSlice.reducer
