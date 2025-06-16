import { baseApi } from './baseApi'
import apiRoutes from '@utils/apiRoutes'
import { GetReportArgs, GetReportResponse } from '@store/types/reportApi'

export const reportApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getReport: builder.query<GetReportResponse, GetReportArgs>({
      query: args => ({
        url: '',
        params: {
          command: apiRoutes.GET_REPORT,
          json: JSON.stringify(args),
          emelClass: 'API3PL',
        },
      }),
      providesTags: ['REPORT'],
    }),
  }),
})
