import { GetLotsArgs, GetLotsResponse, Lots } from '@store/types/lotApi'
import { baseApi } from './baseApi'
import apiRoutes from '@utils/apiRoutes'
import { lotMapper } from '@store/inMappers/lot'

export const lotApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getLots: builder.query<{ Lots?: Lots; Error?: string }, GetLotsArgs>({
      query: args => ({
        url: '',
        method: 'GET',
        params: {
          command: apiRoutes.GET_LOTS,
          emelClass: 'API3PL',
          json: JSON.stringify(args),
        },
      }),
      transformResponse: ({ Lots, Error }: GetLotsResponse) => ({
        Lots: Lots?.map(lotMapper),
        Error,
      }),
      providesTags: ['LOT'],
    }),
  }),
})
