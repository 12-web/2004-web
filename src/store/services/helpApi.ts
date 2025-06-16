import apiRoutes from '@utils/apiRoutes'
import { baseApi } from './baseApi'
import { GetHelpArgs, GetHelpResponse } from '@store/types/helpApi'
import aboutMock from '@pages/AboutPage/mockData.json'
import helpMock from '@pages/HelpPage/mockData.json'

export const helpApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getHelp: builder.query<GetHelpResponse, GetHelpArgs>({
      query: ({ pageType }) => ({
        url: '',
        params: {
          command: apiRoutes.GET_HELP,
          json: JSON.stringify({
            PageType: pageType,
          }),
          emelClass: 'API3PL',
        },
      }),
      transformResponse: (data: GetHelpResponse, meta, { pageType }) => {
        //TODO - при интеграции убрать transformResponse

        const { heading, items } = data

        if (heading || Boolean(items?.length)) {
          return data
        }

        if (pageType === 'about') {
          return aboutMock as GetHelpResponse
        }

        if (pageType === 'help') {
          return helpMock as GetHelpResponse
        }

        return data
      },
    }),
  }),
})
