import { GetMUArgs, GetMUResponse, MUnits } from '@store/types/measurementUnitApi'
import { baseApi } from './baseApi'
import apiRoutes from '@utils/apiRoutes'
import { muMapper } from '@store/inMappers/mu'

export const measurementUnitApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getMeasurementUnits: builder.query<{ MU?: MUnits; Error?: string }, GetMUArgs>({
      query: args => ({
        url: '',
        params: {
          command: apiRoutes.GET_MEASUREMENT_UNITS,
          emelClass: 'API3PL',
          json: JSON.stringify(args),
        },
      }),
      transformResponse: ({ MU, Error }: GetMUResponse) => ({
        MU: MU?.map(muMapper),
        Error,
      }),
    }),
  }),
})
