import {
  DeleteOrderLineArgs,
  DeleteOrderLineResponse,
  GetOrderLinesResponse,
  PostOrderLineArgs,
  PostOrderLineResponse,
  PutOrderLineArgs,
  PutOrderLineResponse,
  TransformGetOrderLinesResponse,
} from '@store/types/orderLineApi'
import { baseApi } from './baseApi'
import apiRoutes from '@utils/apiRoutes'
import { orderLineMapper } from '@store/inMappers/orderLine'

export const orderLineApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getOrderLines: builder.query<TransformGetOrderLinesResponse, { OrderId: number }>({
      query: args => ({
        url: '',
        method: 'POST',
        params: {
          command: apiRoutes.GET_ORDER_LINES,
          json: JSON.stringify(args),
          emelClass: 'API3PL',
        },
      }),
      transformResponse: ({ OrderLine, Error }: GetOrderLinesResponse) => ({
        OrderLine: OrderLine?.map(orderLineMapper),
        Error,
      }),
      providesTags: ['ORDER_LINE'],
    }),
    postOrderLine: builder.mutation<PostOrderLineResponse, PostOrderLineArgs>({
      query: args => ({
        url: '',
        method: 'POST',
        params: {
          command: apiRoutes.POST_ORDER_LINE,
          json: JSON.stringify(args),
          emelClass: 'API3PL',
        },
      }),
      invalidatesTags: ['ORDER_LINE'],
    }),
    putOrderLine: builder.mutation<PutOrderLineResponse, PutOrderLineArgs>({
      query: args => ({
        url: '',
        method: 'POST',
        params: {
          command: apiRoutes.PUT_ORDER_LINE,
          json: JSON.stringify(args),
          emelClass: 'API3PL',
        },
      }),
      invalidatesTags: ['ORDER_LINE'],
    }),
    deleteOrderLine: builder.mutation<DeleteOrderLineResponse, DeleteOrderLineArgs>({
      query: args => ({
        url: '',
        method: 'POST',
        params: {
          command: apiRoutes.DELETE_ORDER_LINE,
          json: JSON.stringify(args),
          emelClass: 'API3PL',
        },
      }),
      invalidatesTags: ['ORDER_LINE'],
    }),
  }),
})
