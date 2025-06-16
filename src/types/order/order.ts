import { Client } from '@store/types/clientApi'
import { Good } from '@store/types/goodApi'
import { Lot, Lots } from '@store/types/lotApi'
import { MUnit, MUnits } from '@store/types/measurementUnitApi'
import { ShipAddress } from '@store/types/shipmentAddressApi'
import { Warehouse } from '@store/types/warehouseApi'

export type OrderLineInput = {
  good: Good
  goodArticle: string
  bbd: Date
  prd: Date
  count: string
  lot: Lot
  measurementUnit: MUnit
}

export type Inputs = {
  orderNumber: string
  client: Client
  shipmentAddress: ShipAddress
  warehouse: Warehouse
  driver: string
  amNumber: string
  sealNumber: string
  loadEndDate: string
  loadStartDate: string
  departureDate: string
  shipmentDate: string
  creationDate: string
  warehouseCode: string
  clientCode: string
  shipmentAddressCode: string
  orderLines: OrderLineInput[]
}

export type OrderLineTableRow = {
  id: number
} & any

export type MeasurementUnitsByRow = {
  [key: string]: MUnits
}
export type LotsByRow = {
  [key: string]: Lots
}
