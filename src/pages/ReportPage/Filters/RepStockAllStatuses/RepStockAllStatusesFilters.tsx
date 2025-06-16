import { Layout } from '@consta/uikit/Layout'
import { FormProvider, useForm } from 'react-hook-form'
import { GoodsTable } from './GoodsTable/GoodsTable'
import { Tabs as TabsUI } from '@components/Tabs/Tabs'
import { WarehousesTable } from './WarehousesTable/WarehousesTable'
import { Button } from '@consta/uikit/Button'
import { getRepStockAllStatusesReport } from '@store/outMappers/report'
import { FilterComponent } from '@pages/ReportPage/ReportPage'
import { RepStockAllStatusesInputs } from 'types/report/report'
import { VendorsTable } from './VendorsTable/VendorsTable'

import styles from '../styles.module.css'

type RepStockAllStatusesFiltersProps = FilterComponent

export const RepStockAllStatusesFilters = ({
  isOpen,
  onToggleFilters,
  onGetClick,
}: RepStockAllStatusesFiltersProps) => {
  const onCollapseClick = () => onToggleFilters(!isOpen)

  const methods = useForm<RepStockAllStatusesInputs>()
  const { handleSubmit } = methods

  const onSubmit = async (data: RepStockAllStatusesInputs) => {
    onGetClick(getRepStockAllStatusesReport(data))
  }

  return (
    <Layout className={styles.root} direction="column">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <Layout className={`${styles.body} ${isOpen ? styles.bodyIsOpen : ''}`}>
            <Layout className={styles.content} direction="column">
              <Layout direction="column" className={styles.flexedContainer}>
                <Layout direction="column" className={styles.flexedContainer}>
                  <TabsUI steps={['Склады', 'Товары', 'Организации']}>
                    {({ step, steps }) => (
                      <>
                        <WarehousesTable className={step === steps[0] ? undefined : 'hidden'} />
                        <GoodsTable className={step === steps[1] ? undefined : 'hidden'} />
                        <VendorsTable className={step === steps[2] ? undefined : 'hidden'} />
                      </>
                    )}
                  </TabsUI>
                </Layout>
              </Layout>
            </Layout>
          </Layout>
          <Layout className={styles.handles}>
            <Button
              onClick={onCollapseClick}
              size="s"
              label={`${isOpen ? 'Скрыть' : 'Развернуть'} фильтры`}
              view="clear"
            />
            <Button type="submit" size="s" label="Построить отчет" />
          </Layout>
        </form>
      </FormProvider>
    </Layout>
  )
}
