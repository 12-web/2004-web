import { useMemo } from 'react'
import { Layout } from '@consta/uikit/Layout'
import { Text } from '@consta/uikit/Text'

import styles from './styles.module.css'

type TableRowsCounterProps = {
  totalCount: number
  currentPageNumber: number
  itemsPerPage: number
  totalPages: number
}

const TableRowsCounter = ({
  totalCount,
  currentPageNumber,
  itemsPerPage,
  totalPages,
}: TableRowsCounterProps) => {
  const firstNumber = useMemo(() => {
    return totalCount < itemsPerPage ? 1 : itemsPerPage * (currentPageNumber - 1) + 1
  }, [totalCount, currentPageNumber, itemsPerPage])

  const secondNumber = useMemo(() => {
    return totalPages === currentPageNumber ? totalCount : currentPageNumber * itemsPerPage
  }, [totalCount, currentPageNumber, itemsPerPage, totalPages])

  return (
    <Layout className={styles.counter}>
      <Text size="s" view="secondary">
        Отображены записи {firstNumber} - {secondNumber} из {totalCount}
      </Text>
    </Layout>
  )
}

export default TableRowsCounter
