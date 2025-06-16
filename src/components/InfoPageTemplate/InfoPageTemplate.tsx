import LayoutContainer from '@components/LayoutContainer'
import { Layout } from '@consta/uikit/Layout'
import InfoBlock from '@components/InfoBlock/InfoBlock'
import { Text } from '@consta/uikit/Text'
import { GetHelpResponse } from '@store/types/helpApi'
import { Loader } from '@consta/uikit/Loader'

import styles from './styles.module.css'
import { requestMessage } from '@utils/userMessages/RequestMessages'

type InfoPageTemplateProps = {
  isLoading?: boolean
} & GetHelpResponse

const InfoPageTemplate = ({ heading, items, isLoading }: InfoPageTemplateProps) => {
  const content = isLoading ? (
    <Loader className={styles.loader} />
  ) : (
    <>
      {!heading && !items?.length && (
        <Text size="s" className={styles.emptyText}>
          {requestMessage.emptyContent}
        </Text>
      )}
      {heading && (
        <Text className={styles.title} view="brand" weight="regular" size="4xl">
          {heading}
        </Text>
      )}
      {Boolean(items?.length) && items.map((infoBlock, i) => <InfoBlock key={i} {...infoBlock} />)}
    </>
  )

  return (
    <LayoutContainer>
      <Layout className={styles.main} direction="column">
        {content}
      </Layout>
    </LayoutContainer>
  )
}

export default InfoPageTemplate
