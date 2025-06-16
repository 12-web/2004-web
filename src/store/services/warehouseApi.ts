import { baseApi } from './baseApi'
import apiRoutes from '@utils/apiRoutes'
import { GetWarehousesResponse, TransformGetWarehousesResponse } from '@store/types/warehouseApi'
import { warehouseMapper } from '@store/inMappers/warehouse'

export const warehouseApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getWarehouses: builder.query<TransformGetWarehousesResponse, void>({
      query: () => ({
        url: '',
        params: {
          command: apiRoutes.GET_WAREHOUSES,
          emelClass: 'API3PL',
        },
      }),
      transformResponse: ({ Warehouse, Error }: GetWarehousesResponse) => ({
        Warehouse: Warehouse?.map(warehouseMapper),
        Error,
      }),
    }),
  }),
})
