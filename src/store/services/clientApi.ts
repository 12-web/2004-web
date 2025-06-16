import {
  GetClientsResponse,
  Clients,
  PostClientsArgs,
  PostClientsResponse,
} from '@store/types/clientApi'
import { baseApi } from './baseApi'
import apiRoutes from '@utils/apiRoutes'
import { clientMapper } from '@store/inMappers/client'

export const clientApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getClients: builder.query<{ Clients?: Clients; Error?: string }, void>({
      query: () => ({
        url: '',
        params: {
          command: apiRoutes.GET_CLIENTS,
          emelClass: 'API3PL',
        },
      }),
      transformResponse: ({ ClientList, Error }: GetClientsResponse) => ({
        Clients: ClientList?.map(clientMapper),
        Error,
      }),
      providesTags: ['CLIENTS'],
    }),
    postClient: builder.mutation<PostClientsResponse, PostClientsArgs>({
      query: args => ({
        url: '',
        method: 'POST',
        params: {
          command: apiRoutes.POST_CLIENT,
          emelClass: 'API3PL',
          json: JSON.stringify(args),
        },
      }),
      invalidatesTags: ['CLIENTS', 'Suppliers'],
    }),
  }),
})
