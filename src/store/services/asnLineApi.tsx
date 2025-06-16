import {
  AsnLine,
  DeleteAsnLineResponse,
  GetAsnLineResponse,
  PostAsnLineArgs,
  PostAsnLineResponse,
  PutAsnLineArgs,
  PutAsnLineResponse,
} from '@store/types/asnLineApi'
import { baseApi } from './baseApi'
import apiRoutes from '@utils/apiRoutes'
import { asnLineMapper } from '@store/inMappers/asnLine'

export const asnLineApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAsnLines: builder.query<{ AsnLine?: AsnLine[]; Error?: string }, { AsnId: number }>({
      query: args => ({
        url: '',
        method: 'POST',
        params: {
          command: apiRoutes.GET_ASN_LINES,
          json: JSON.stringify(args),
          emelClass: 'API3PL',
        },
      }),
      transformResponse: ({ AsnLine, Error }: GetAsnLineResponse) => ({
        AsnLine: AsnLine?.map(asnLineMapper),
        Error,
      }),
      providesTags: ['ASN_LINE'],
    }),
    postAsnLine: builder.mutation<PostAsnLineResponse, PostAsnLineArgs>({
      query: args => ({
        url: '',
        method: 'POST',
        params: {
          command: apiRoutes.POST_ASN_LINE,
          json: JSON.stringify(args),
          emelClass: 'API3PL',
        },
      }),
      invalidatesTags: ['ASN_LINE'],
    }),
    putAsnLine: builder.mutation<PutAsnLineResponse, PutAsnLineArgs>({
      query: args => ({
        url: '',
        method: 'POST',
        params: {
          command: apiRoutes.PUT_ASN_LINE,
          json: JSON.stringify(args),
          emelClass: 'API3PL',
        },
      }),
      invalidatesTags: ['ASN_LINE'],
    }),
    deleteAsnLine: builder.mutation<DeleteAsnLineResponse, { id: number }>({
      query: ({ id }) => ({
        url: '',
        method: 'POST',
        params: {
          command: apiRoutes.DELETE_ASN_LINE,
          json: JSON.stringify({ AsnLineId: id }),
          emelClass: 'API3PL',
        },
      }),
      invalidatesTags: ['ASN_LINE'],
    }),
  }),
})
