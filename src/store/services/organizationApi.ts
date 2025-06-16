import { baseApi } from './baseApi'
import apiRoutes from '@utils/apiRoutes'
import {
  GetOrganizationsResponse,
  TransformGetOrganizationsResponse,
} from '@store/types/organizationApi'
import { organizationMapper } from '@store/inMappers/organization'

export const organizationApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getOrganization: builder.query<TransformGetOrganizationsResponse, void>({
      query: () => ({
        url: '',
        params: {
          command: apiRoutes.GET_ORGANIZATIONS,
          emelClass: 'API3PL',
        },
      }),
      transformResponse: ({ OrganizationsList, Error }: GetOrganizationsResponse) => ({
        Organizations: OrganizationsList?.map(organizationMapper),
        Error,
      }),
    }),
  }),
})
