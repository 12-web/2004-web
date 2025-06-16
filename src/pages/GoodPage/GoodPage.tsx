import LayoutContainer from '@components/LayoutContainer'
import { Layout } from '@consta/uikit/Layout'
import GoodsTable from './GoodsTable/GoodsTable'
import Alert from '@shared/Alert'

import styles from './style.module.css'

const GoodPage = () => {
  return (
    <LayoutContainer>
      <Layout className={styles.main} direction="column">
        <GoodsTable />
        <Alert />
      </Layout>
    </LayoutContainer>
  )
}

export default GoodPage
