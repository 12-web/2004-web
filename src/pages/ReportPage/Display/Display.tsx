import { Layout } from '@consta/uikit/Layout'
import { Buffer } from 'buffer'
import DOMPurify from 'dompurify'
import { Loader } from '@consta/uikit/Loader'
import { Text } from '@consta/uikit/Text'

import styles from './styles.module.css'

type DisplayProps = {
  isFiltersOpen: boolean
  result?: string
  isLoading?: boolean
}

export const Display = ({ isFiltersOpen, result = '', isLoading }: DisplayProps) => {
  const convertedResult = Buffer.from(result, 'base64').toString('utf8')

  const content = isLoading ? (
    <Loader className={styles.loader} />
  ) : (
    <Layout
      className={styles.content}
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(convertedResult, { FORCE_BODY: true }),
      }}
    />
  )
  return (
    <Layout className={`${styles.root} ${isFiltersOpen ? styles.rootWithFiltersOpened : ''}`}>
      {result || isLoading ? (
        content
      ) : (
        <Text className={styles.emptyTableText} align="center" size="s">
          Для формирования отчета нажмите на кнопку "Построить отчет"
        </Text>
      )}
    </Layout>
  )
}
