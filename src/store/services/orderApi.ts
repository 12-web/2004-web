import {
  DeleteOrderArgs,
  DeleteOrdersResponse,
  GetOrderArgs,
  GetOrderResponse,
  GetOrdersArgs,
  GetOrdersResponse,
  Order,
  PostOrderArgs,
  PostOrderResponse,
  PutOrderArgs,
  PutOrderResponse,
  RunOrderArgs,
  RunOrdersResponse,
  UploadOrderArgs,
  UploadOrderResponse,
} from '@store/types/orderApi'
import { baseApi } from './baseApi'
import apiRoutes from '@utils/apiRoutes'
import { orderMapper } from '@store/inMappers/order'
import { store } from '..'

export const orderApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getOrderById: builder.query<{ Order?: Order; Error?: string }, GetOrderArgs>({
      query: args => ({
        url: '',
        method: 'GET',
        params: {
          command: apiRoutes.GET_ORDER,
          json: JSON.stringify(args),
          emelClass: 'API3PL',
        },
      }),
      transformResponse: ({ Order, Error }: GetOrderResponse) => ({
        Order: Order ? orderMapper(Order) : undefined,
        Error,
      }),
      providesTags: ['ORDER'],
    }),
    getOrders: builder.query<{ Order?: Order[]; Error?: string }, GetOrdersArgs>({
      query: args => ({
        url: '',
        method: 'GET',
        params: {
          command: apiRoutes.GET_ORDERS,
          json: JSON.stringify(args),
          emelClass: 'API3PL',
        },
      }),
      transformResponse: ({ Order, Error }: GetOrdersResponse) => ({
        Order: Order?.map(orderMapper),
        Error,
      }),
      providesTags: ['ORDER'],
    }),
    postOrder: builder.mutation<PostOrderResponse, PostOrderArgs>({
      query: args => ({
        url: '',
        method: 'GET',
        params: {
          command: apiRoutes.POST_ORDER,
          json: JSON.stringify(args),
          emelClass: 'API3PL',
        },
      }),
      invalidatesTags: ['ORDER'],
    }),
    putOrder: builder.mutation<PutOrderResponse, PutOrderArgs>({
      query: args => ({
        url: '',
        method: 'POST',
        params: {
          command: apiRoutes.PUT_ORDER,
          json: JSON.stringify(args),
          emelClass: 'API3PL',
        },
      }),
      invalidatesTags: ['ORDER'],
    }),
    deleteOrder: builder.mutation<DeleteOrdersResponse, DeleteOrderArgs>({
      query: args => ({
        url: '',
        method: 'POST',
        params: {
          command: apiRoutes.DELETE_ORDER,
          json: JSON.stringify(args),
          emelClass: 'API3PL',
        },
      }),
      invalidatesTags: ['ORDER'],
    }),
    runOrder: builder.mutation<RunOrdersResponse, RunOrderArgs>({
      query: args => ({
        url: '',
        method: 'POST',
        params: {
          command: apiRoutes.RUN_ORDER,
          json: JSON.stringify(args),
          emelClass: 'API3PL',
        },
      }),
      invalidatesTags: ['ORDER'],
    }),
    uploadOrder: builder.mutation<UploadOrderResponse, UploadOrderArgs>({
      query: args => ({
        url: '',
        method: 'POST',
        params: {
          command: apiRoutes.UPLOAD_ORDER,
          emelClass: 'API3PL',
        },
        body: {
          TockenId: store.getState().authUser.token,
          FileEncode: 'utf8',
          ...args,
        },
      }),
      invalidatesTags: ['ORDER'],
    }),
  }),
})
