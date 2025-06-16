import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import apiRoutes from '@utils/apiRoutes'
import config from '@utils/config'
import { store } from '..'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: config.BASE_API_ENDPOINT,
    paramsSerializer: params => {
      const isAuthQuery = params.command === apiRoutes.CHECK_LOGIN

      if (isAuthQuery) {
        return new URLSearchParams(params).toString()
      }

      const token = store.getState().authUser.token
      const json = params.json ? JSON.parse(params.json) : {}
      json.TockenId = token
      return new URLSearchParams({ ...params, json: JSON.stringify(json) }).toString()
    },
  }),
  tagTypes: [
    'Suppliers',
    'ASN',
    'ASN_LINE',
    'ORDER',
    'ORDER_LINE',
    'LOT',
    'CLIENTS',
    'ADDRESSES',
    'REPORT',
  ],
  endpoints: () => ({}),
})
