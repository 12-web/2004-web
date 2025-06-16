import {
  GetShipAddressesArgs,
  GetShipAddressesResponse,
  PostShipAddressArgs,
  PostShipAddressResponse,
  TransformGetShipAddressesResponse,
} from '@store/types/shipmentAddressApi'
import { baseApi } from './baseApi'
import apiRoutes from '@utils/apiRoutes'
import { clientMapper } from '@store/inMappers/client'

export const shipmentAddressApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getShipAddresses: builder.query<TransformGetShipAddressesResponse, GetShipAddressesArgs>({
      query: args => ({
        url: '',
        params: {
          command: apiRoutes.GET_SHIPMENT_ADDRESS,
          emelClass: 'API3PL',
          json: JSON.stringify(args),
        },
      }),
      transformResponse: ({ Client, Error }: GetShipAddressesResponse) => ({
        ShipAddresses: Client?.map(clientMapper),
        Error,
      }),
      providesTags: ['ADDRESSES'],
    }),
    postShipmentAddress: builder.mutation<PostShipAddressResponse, PostShipAddressArgs>({
      query: args => ({
        url: '',
        method: 'POST',
        params: {
          command: apiRoutes.POST_SHIPMENT_ADDRESS,
          emelClass: 'API3PL',
          json: JSON.stringify(args),
        },
      }),
      invalidatesTags: ['ADDRESSES'],
    }),
  }),
})
