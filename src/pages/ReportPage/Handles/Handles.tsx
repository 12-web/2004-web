import { Layout } from '@consta/uikit/Layout'
import SendReportForm from './components/SendReportForm/SendReportForm'
import { Button } from '@consta/uikit/Button'
import BtnsList, { BtnsListProps } from '@components/BtnsList/BtnsList'

import styles from './styles.module.css'

export const Handles = () => {
  const handlePrintClick = () => {}

  const handleExportClick = (label: string) => {
    console.log(label)
  }

  const btns: BtnsListProps['btns'] = [
    {
      label: 'PDF',
      handleClick: handleExportClick,
    },
    {
      label: 'EXCEL',
      handleClick: handleExportClick,
    },
  ]

  return (
    <Layout className={styles.root}>
      <BtnsList buttonName="Сохранить отчет" btns={btns} />
      <Button
        className="button"
        label="Печать отчета"
        size="s"
        view="secondary"
        onClick={handlePrintClick}
      />
      <SendReportForm />
    </Layout>
  )
}
