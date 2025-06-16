import { GetGoodsResponse, Goods } from '@store/types/goodApi'
import { baseApi } from './baseApi'
import apiRoutes from '@utils/apiRoutes'
import { goodMapper } from '@store/inMappers/good'

export const goodApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getGoods: builder.query<{ Goods?: Goods; Error?: string }, void>({
      query: () => ({
        url: '',
        params: {
          command: apiRoutes.GET_GOODS,
          emelClass: 'API3PL',
          // json: JSON.stringify({ NeedQty: '1', Filter: 'ЦБ-2091826' }),
        },
      }),
      transformResponse: ({ GoodsItems, Error }: GetGoodsResponse) => ({
        Goods: GoodsItems?.map(good => goodMapper(good)),
        Error,
      }),
    }),
  }),
})
