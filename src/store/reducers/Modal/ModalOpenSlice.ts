import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type ModalStateProps = {
  openedIds: string[]
}

type OpenedModalStateProps = {
  openedIds: string[]
}

const initialState: ModalStateProps = {
  openedIds: [],
}

const modalOpenSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    opened(state: ModalStateProps, action: PayloadAction<string>) {
      state.openedIds.push(action.payload)
    },
    closed(state: ModalStateProps) {
      state.openedIds.pop()
    },
  },
})

export const { opened, closed } = modalOpenSlice.actions
export default modalOpenSlice.reducer
