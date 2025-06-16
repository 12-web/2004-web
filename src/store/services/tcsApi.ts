import { baseApi } from './baseApi'
import apiRoutes from '@utils/apiRoutes'
import { GetTcsResponse, TransformGetTcsResponse } from '@store/types/tcsApi'
import { tscMapper } from '@store/inMappers/tcs'

export const tcsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getTcs: builder.query<TransformGetTcsResponse, void>({
      query: () => ({
        url: '',
        params: {
          command: apiRoutes.GET_TCs,
          emelClass: 'API3PL',
        },
      }),
      transformResponse: ({ ClientList, Error }: GetTcsResponse) => ({
        Tcs: ClientList?.map(tscMapper),
        Error,
      }),
    }),
  }),
})
