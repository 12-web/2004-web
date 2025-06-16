import { Layout } from '@consta/uikit/Layout'
import { FC, ReactNode } from 'react'
import Header from '@components/Header'

import styles from './styles.module.css'

interface LayoutContainerProps {
  children: ReactNode
}

const LayoutContainer = ({ children }: LayoutContainerProps) => {
  return (
    <Layout className={styles.main} direction="column">
      <Header />
      {children}
    </Layout>
  )
}

export default LayoutContainer
