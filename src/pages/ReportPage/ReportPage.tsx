import LayoutContainer from '@components/LayoutContainer'
import { Layout } from '@consta/uikit/Layout'
import { Handles } from './Handles/Handles'
import { Display } from './Display/Display'
import { FC, useEffect, useState } from 'react'
import { reportApi } from '@store/services/reportApi'
import Alert from '@shared/Alert'
import { useNavigate, useParams } from 'react-router'
import { useToast } from '@hooks/useToast'

import { RepOrderStatusFilters } from './Filters/RepOrderStatusFilters/RepOrderStatusFilters'
import { RepIncFilters } from './Filters/RepIncFilters/RepIncFilters'
import { RepIncOutFilters } from './Filters/RepIncOutFilters/RepIncOutFilters'
import { RepOutFilters } from './Filters/RepOutFilters/RepOutFilters'
import { RepStockAllStatusesFilters } from './Filters/RepStockAllStatuses/RepStockAllStatusesFilters'

import styles from './style.module.css'
import { RepShippedPalletPlacesFilters } from './Filters/RepShippedPalletPlaces/RepShippedPalletPlacesFilters'
import { RepMoveSSCCFilters } from './Filters/RepMoveSSCC/RepMoveSSCCFilters'

export const reports = {
  repOrderStatus: RepOrderStatusFilters,
  repInc: RepIncFilters,
  repIncOut: RepIncOutFilters,
  repOut: RepOutFilters,
  repStockAllStatuses: RepStockAllStatusesFilters,
  repMoveSSCC: RepMoveSSCCFilters,
  repShippedPalletPlaces: RepShippedPalletPlacesFilters,
}

type ReportNames = keyof typeof reports

export type FilterComponent = {
  onToggleFilters: (isOpen: boolean) => void
  isOpen: boolean
  onGetClick: (args: { [key: string]: string | number }) => void
}

const OrderReportPage = () => {
  const { reportName } = useParams()
  const navigate = useNavigate()

  const isReportExist = reportName && reportName in reports

  useEffect(() => {
    if (!isReportExist) navigate('/asn')
  }, [isReportExist])

  const ReportFilters: FC<FilterComponent> = reports[reportName as ReportNames]

  const [isOpen, setIsOpen] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const [getReport, result] = reportApi.useLazyGetReportQuery()

  const { showToast } = useToast()

  const handleGetReport = async (args: { [key: string]: string | number }) => {
    try {
      setIsLoading(true)
      const { Error } = await getReport(args).unwrap()
      Error && showToast(Error)
    } catch (err) {
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <LayoutContainer>
      <Layout className={styles.main} direction="column">
        <Layout className={styles.header}>
          <Handles />
          {isReportExist && (
            <ReportFilters
              onToggleFilters={setIsOpen}
              isOpen={isOpen}
              onGetClick={handleGetReport}
            />
          )}
        </Layout>
        <Display isFiltersOpen={isOpen} result={result.data?.result} isLoading={isLoading} />
        <Alert />
      </Layout>
    </LayoutContainer>
  )
}

export default OrderReportPage
