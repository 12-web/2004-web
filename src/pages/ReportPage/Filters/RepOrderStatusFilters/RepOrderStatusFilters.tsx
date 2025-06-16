import { useEffect } from 'react'
import { Layout } from '@consta/uikit/Layout'
import { IconCalendar } from '@consta/icons/IconCalendar'
import DatePicker from '@components/ReactHookForm/DatePicker'
import { Text } from '@consta/uikit/Text'
import { FormProvider, useForm } from 'react-hook-form'
import { message } from '@utils/userMessages/FormMessages'
import { formatDateISO } from '@utils/dates'
import { Tabs as TabsUI } from '@components/Tabs/Tabs'
import { Button } from '@consta/uikit/Button'
import { getRepOrderStatusReport } from '@store/outMappers/report'
import { FilterComponent } from '@pages/ReportPage/ReportPage'
import { RepOrderStatusInputs } from 'types/report/report'
import { VendorsTable } from './VendorsTable/VendorsTable'

import styles from '../styles.module.css'

type RepOrderStatusFiltersProps = FilterComponent

export const RepOrderStatusFilters = ({
  isOpen,
  onToggleFilters,
  onGetClick,
}: RepOrderStatusFiltersProps) => {
  const onCollapseClick = () => onToggleFilters(!isOpen)

  const methods = useForm<RepOrderStatusInputs>()
  const { handleSubmit, register, setValue } = methods

  const onSubmit = async (data: RepOrderStatusInputs) => {
    onGetClick(getRepOrderStatusReport(data))
  }

  useEffect(() => {
    setTimeout(() => {
      setValue('dateFrom', formatDateISO(new Date()) || '')
      setValue('dateTo', formatDateISO(new Date()) || '')
    }, 0)
  }, [])

  return (
    <Layout className={styles.root} direction="column">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <Layout className={`${styles.body} ${isOpen ? styles.bodyIsOpen : ''}`}>
            <Layout className={styles.content} direction="column">
              <Layout direction="column" className={styles.flexedContainer}>
                <Layout className={styles.dates}>
                  <Layout className={styles.datesInner}>
                    <Text size="s">Дата отчета c</Text>
                    <DatePicker
                      className={styles.date}
                      registered={register('dateFrom', {
                        required: message.required,
                        valueAsDate: true,
                      })}
                      rightSide={IconCalendar}
                      size="s"
                      format="dd/MM/yyyy"
                      placeholder="дд/мм/гггг"
                    />
                  </Layout>
                  <Layout className={styles.datesInner}>
                    <Text size="s">по</Text>
                    <DatePicker
                      className={styles.date}
                      registered={register('dateTo', {
                        required: message.required,
                        valueAsDate: true,
                      })}
                      rightSide={IconCalendar}
                      size="s"
                      format="dd/MM/yyyy"
                      placeholder="дд/мм/гггг"
                    />
                  </Layout>
                </Layout>
                <Layout direction="column" className={styles.flexedContainer}>
                  <TabsUI steps={['Организации']}>
                    {({ step, steps }) => (
                      <>
                        <VendorsTable className={step === steps[0] ? undefined : 'hidden'} />
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
