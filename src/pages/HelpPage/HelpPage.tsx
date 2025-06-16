import InfoPageTemplate from '@components/InfoPageTemplate'
import { helpApi } from '@store/services/helpApi'
import { GetHelpResponse } from '@store/types/helpApi'

const HelpPage = () => {
  const { data, isLoading } = helpApi.useGetHelpQuery({ pageType: 'help' })

  return <InfoPageTemplate {...(data as GetHelpResponse)} isLoading={isLoading} />
}

export default HelpPage
