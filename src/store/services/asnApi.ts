import {
  GetAsnArgs,
  Asn,
  PutAsnArgs,
  GetAsnsResponse,
  DeleteAsnResponse,
  DeleteAsnArgs,
  PutAsnResponse,
  PostAsnResponse,
  UploadAsnResponse,
  UploadAsnArgs,
} from '@store/types/asnApi'
import { PostAsnArgs } from '@store/types/asnApi'
import { baseApi } from './baseApi'
import apiRoutes from '@utils/apiRoutes'
import { formatDateISO } from '@utils/dates'
import { asnMapper } from '@store/inMappers/asn'
import { store } from '..'

export const asnApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAsnById: builder.query<{ Asn?: Asn; Error?: string }, { AsnId: number }>({
      query: () => ({
        url: '',
        method: 'GET',
        params: {
          command: apiRoutes.GET_ASN,
          json: JSON.stringify({
            DateFrom: formatDateISO(new Date('01/01/1991')),
            DateTo: formatDateISO(new Date()),
          }),
          emelClass: 'API3PL',
        },
      }),
      transformResponse: ({ Asn, Error }: GetAsnsResponse, meta, { AsnId }) => {
        // при наличии на бэке метода по запросу одного asn - переделать на него
        const asn = Asn?.find(asn => asn?.AsnId == AsnId)
        return {
          Asn: asn ? asnMapper(asn) : undefined,
          Error,
        }
      },
      providesTags: ['ASN'],
    }),
    getAsn: builder.query<{ Asn?: Asn[]; Error?: string }, GetAsnArgs>({
      query: args => ({
        url: '',
        method: 'GET',
        params: {
          command: apiRoutes.GET_ASN,
          json: JSON.stringify(args),
          emelClass: 'API3PL',
        },
      }),
      transformResponse: ({ Asn, Error }: GetAsnsResponse) => ({
        Asn: Asn?.map(asnMapper),
        Error,
      }),
      providesTags: ['ASN'],
    }),
    postAsn: builder.mutation<PostAsnResponse, PostAsnArgs>({
      query: args => ({
        url: '',
        method: 'POST',
        params: {
          command: apiRoutes.POST_ASN,
          json: JSON.stringify(args),
          emelClass: 'API3PL',
        },
      }),
      invalidatesTags: ['ASN'],
    }),
    putAsn: builder.mutation<PutAsnResponse, PutAsnArgs>({
      query: args => ({
        url: '',
        method: 'POST',
        params: {
          command: apiRoutes.PUT_ASN,
          json: JSON.stringify(args),
          emelClass: 'API3PL',
        },
      }),
      invalidatesTags: ['ASN'],
    }),
    deleteAsn: builder.mutation<DeleteAsnResponse, DeleteAsnArgs>({
      query: args => ({
        url: '',
        method: 'POST',
        params: {
          command: apiRoutes.DELETE_ASN,
          json: JSON.stringify(args),
          emelClass: 'API3PL',
        },
      }),
      invalidatesTags: ['ASN'],
    }),
    uploadAsn: builder.mutation<UploadAsnResponse, UploadAsnArgs>({
      query: args => ({
        url: '',
        method: 'POST',
        params: {
          command: apiRoutes.UPLOAD_ASN,
          emelClass: 'API3PL',
        },
        body: {
          TockenId: store.getState().authUser.token,
          FileEncode: '1251',
          ...args,
        },
      }),
      invalidatesTags: ['ORDER'],
    }),
  }),
})
