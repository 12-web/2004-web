import { isRejectedWithValue } from '@reduxjs/toolkit'
import type { MiddlewareAPI, Middleware, SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { opened } from '@store/reducers/Alert/AlertSlice'
import { requestMessage } from '@utils/userMessages/RequestMessages'

export const errorLogger: Middleware = (api: MiddlewareAPI) => next => action => {
  if (isRejectedWithValue(action)) {
    const error = action.payload as unknown as FetchBaseQueryError | SerializedError
    let message

    if ('status' in error) {
      const { status } = error
      message = `${('originalStatus' in error && error.originalStatus) || ''} ${status}. ${requestMessage.errorRequest}`
    } else {
      message = requestMessage.errorRequest
    }

    api.dispatch(opened({ message }))
  }

  return next(action)
}
