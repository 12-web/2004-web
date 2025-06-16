import { Good } from '@store/types/goodApi'
import { Organization } from '@store/types/organizationApi'
import { Warehouse } from '@store/types/warehouseApi'

export type Inputs = {
  email: string
}

export type RepIncInputs = {
  dateFrom: string
  dateTo: string
  goods: Good[] | 'Все'
  warehouses: Warehouse[] | 'Все'
}

export type RepIncOutInputs = {
  dateFrom: string
  dateTo: string
  goods: Good[] | 'Все'
  warehouses: Warehouse[] | 'Все'
}

export type RepOutInputs = {
  dateFrom: string
  dateTo: string
  goods: Good[] | 'Все'
  warehouses: Warehouse[] | 'Все'
}

export type RepOrderStatusInputs = {
  dateFrom: string
  dateTo: string
  vendors: Organization[] | 'Все'
}

export type RepStockAllStatusesInputs = {
  goods: Good[] | 'Все'
  warehouses: Warehouse[] | 'Все'
  vendors: Organization[] | 'Все'
}

export type RepMoveSSCCInputs = {
  dateFrom: string
  dateTo: string
  sscc: string
  ssccref: number
}

export type RepShippedPalletPlacesInputs = {
  dateFrom: string
  dateTo: string
  warehouses: Warehouse[] | 'Все'
  tcs: any[] | 'Все'
}
