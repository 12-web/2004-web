import { formatDateISO } from '@utils/dates'
import {
  RepIncInputs,
  RepIncOutInputs,
  RepMoveSSCCInputs,
  RepOrderStatusInputs,
  RepOutInputs,
  RepShippedPalletPlacesInputs,
  RepStockAllStatusesInputs,
} from 'types/report/report'

const prepareReportItems = (items: string | { id: number }[]) => {
  return typeof items === 'string'
    ? items
    : !!items?.length
      ? items?.map(item => item.id).join(';')
      : 'Все'
}

export const getRepIncReport = (inputs: RepIncInputs): { [key: string]: string | number } => ({
  report: 'RepInc',
  DateFrom: formatDateISO(new Date(inputs.dateFrom)) || '',
  DateTo: formatDateISO(new Date(inputs.dateTo)) || '',
  Warehouses: prepareReportItems(inputs.warehouses),
  GoodItems: prepareReportItems(inputs.goods),
})

export const getRepIncOutReport = (
  inputs: RepIncOutInputs,
): { [key: string]: string | number } => ({
  report: 'RepIncOut',
  DateFrom: formatDateISO(new Date(inputs.dateFrom)) || '',
  DateTo: formatDateISO(new Date(inputs.dateTo)) || '',
  Warehouses: prepareReportItems(inputs.warehouses),
  GoodItems: prepareReportItems(inputs.goods),
})

export const getRepOutReport = (inputs: RepOutInputs): { [key: string]: string | number } => ({
  report: 'RepOut',
  DateFrom: formatDateISO(new Date(inputs.dateFrom)) || '',
  DateTo: formatDateISO(new Date(inputs.dateTo)) || '',
  Warehouses: prepareReportItems(inputs.warehouses),
  GoodItems: prepareReportItems(inputs.goods),
})

export const getRepOrderStatusReport = (
  inputs: RepOrderStatusInputs,
): { [key: string]: string | number } => ({
  report: 'RepOrderStatus',
  DateFrom: formatDateISO(new Date(inputs.dateFrom)) || '',
  DateTo: formatDateISO(new Date(inputs.dateTo)) || '',
  Vendors: prepareReportItems(inputs.vendors),
})

export const getRepStockAllStatusesReport = (
  inputs: RepStockAllStatusesInputs,
): { [key: string]: string | number } => ({
  report: 'RepStockAllStatuses',
  Warehouses: prepareReportItems(inputs.warehouses),
  GoodItems: prepareReportItems(inputs.goods),
  Vendors: prepareReportItems(inputs.vendors),
})

export const getRepMoveSSCCReport = (
  inputs: RepMoveSSCCInputs,
): { [key: string]: string | number } => ({
  report: 'RepMoveSSCC',
  DateFrom: formatDateISO(new Date(inputs.dateFrom)) || '',
  DateTo: formatDateISO(new Date(inputs.dateTo)) || '',
  SSCC: inputs.sscc || '',
})

export const getRepShippedPalletPlacesReport = (
  inputs: RepShippedPalletPlacesInputs,
): { [key: string]: string | number } => ({
  report: 'RepShippedPalletPlaces',
  DateFrom: formatDateISO(new Date(inputs.dateFrom)) || '',
  DateTo: formatDateISO(new Date(inputs.dateTo)) || '',
  Warehouses: prepareReportItems(inputs.warehouses),
  TCs: prepareReportItems(inputs.tcs),
})
