import { baseApi } from './baseApi'
import apiRoutes from '@utils/apiRoutes'

interface LoginResponse {
  TockenId?: string
  Error?: string
}

interface LoginParams {
  user: string | null
  password: string | null
}

export const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<LoginResponse, LoginParams>({
      query: ({ user, password }) => ({
        url: '',
        method: 'POST',
        mode: 'cors',
        params: {
          command: apiRoutes.CHECK_LOGIN,
          json: JSON.stringify({
            user,
            password,
          }),
          emelClass: 'API3PL',
        },
      }),
    }),
  }),
})
