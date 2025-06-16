import {
  PostSuppliersArgs,
  GetSuppliersResponse,
  PostSuppliersResponse,
  TransformGetSuppliersResponse,
} from '@store/types/supplierApi'
import { baseApi } from './baseApi'
import apiRoutes from '@utils/apiRoutes'
import { clientMapper } from '@store/inMappers/client'

export const suppliersApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getSuppliers: builder.query<TransformGetSuppliersResponse, void>({
      query: () => ({
        url: '',
        params: {
          command: apiRoutes.GET_SUPPLIERS,
          emelClass: 'API3PL',
        },
      }),
      transformResponse: ({ ClientList, Error }: GetSuppliersResponse) => ({
        Suppliers: ClientList?.map(clientMapper),
        Error,
      }),
      providesTags: ['Suppliers'],
    }),
    postSupplier: builder.mutation<PostSuppliersResponse, PostSuppliersArgs>({
      query: args => ({
        url: '',
        method: 'POST',
        params: {
          command: apiRoutes.POST_CLIENT,
          emelClass: 'API3PL',
          json: JSON.stringify(args),
        },
      }),
      invalidatesTags: ['Suppliers'],
    }),
  }),
})
