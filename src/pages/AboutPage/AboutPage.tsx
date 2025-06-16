import InfoPageTemplate from '@components/InfoPageTemplate'
import { helpApi } from '@store/services/helpApi'
import { GetHelpResponse } from '@store/types/helpApi'

const AboutPage = () => {
  const { data, isLoading } = helpApi.useGetHelpQuery({ pageType: 'about' })

  return <InfoPageTemplate {...(data as GetHelpResponse)} isLoading={isLoading} />
}

export default AboutPage
