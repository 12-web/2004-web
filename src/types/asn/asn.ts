import { Good } from '@store/types/goodApi'
import { MUnit } from '@store/types/measurementUnitApi'
import { Organization } from '@store/types/organizationApi'
import { Supplier } from '@store/types/supplierApi'
import { Warehouse } from '@store/types/warehouseApi'

export type AsnLineInput = {
  good: Good
  goodArticle: string
  bbd: Date
  comment: string
  count: string
  stockStatus: { id: string }
  lot: string
  measurementUnit: MUnit
  status: string
}

export type Inputs = {
  no: string
  operator: string
  entryNumber: string
  extNo: string
  comment: string
  client: Supplier
  clientCode: string
  organization: Organization
  warehouse: Warehouse
  creationDate: string
  shipmentDate: string
  supplierCode: string
  warehouseCode: string
  organizationCode: string
  incomingNo: string
  asnLines: AsnLineInput[]
}

export type AsnLineTableRow = {
  id: number
} & any
