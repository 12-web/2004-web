import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { baseApi } from './services/baseApi'
import authUser from './reducers/User/AuthUserSlice'
import modalState from './reducers/Modal/ModalOpenSlice'
import orderDataState from './reducers/Order/OrderDataSlice'
import orderTableState from './reducers/OrderTable/OrderTableSlice'
import asnTableState from './reducers/AsnTable/AsnTableSlice'
import asnDataState from './reducers/Asn/AsnDataSlice'
import alertState from './reducers/Alert/AlertSlice'

import { errorLogger } from './middlewares/error'

const rootReducer = combineReducers({
  authUser,
  modalState,
  orderDataState,
  orderTableState,
  asnTableState,
  asnDataState,
  alertState,
  [baseApi.reducerPath]: baseApi.reducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(baseApi.middleware, errorLogger),
  })
}

export const store = setupStore()

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
