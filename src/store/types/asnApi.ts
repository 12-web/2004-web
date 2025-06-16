import { Client } from './clientApi'
import { Warehouse } from './warehouseApi'

export type AsnResponse = {
  No: string
  AsnId: number
  ExtNo: string
  Comment: string
  IncomingNo: string
  IncomingState: string
  WarehouseFrom: {
    WarehouseId: number
    Code: string
    Name: string
  }
  WarehouseTo: {
    WarehouseId: number
    Code: string
    Name: string
  }
  Supplier: {
    ClientId: number
    Code: string
    Name: string
  }
  VendorFrom: {
    ClientId: number
    Code: string
    Name: string
  }
  VendorTo: {
    ClientId: number
    Code: string
    Name: string
  }
  Reason: {
    ClientId: number
    Code: string
  }
  Operator: string
  Date: string
  Editable: boolean
  ExpectedIncomeDate: string
}

export type GetAsnResponse = {
  Asn: AsnResponse
  Error?: string
}

export type GetAsnsResponse = {
  Asn: AsnResponse[]
  Error?: string
}

export interface DeleteAsnResponse {
  result?: string
  Error?: string
}

export type PutAsnResponse = {
  result?: string
  Error?: string
}

export interface PostAsnResponse {
  AsnId?: number
  Error?: string
}

export type PostAsnArgs = {
  Asn: {
    No: string
    ExtNo: string
    WarehouseFromId: number
    WarehouseToId: number
    SupplierId: number
    VendorFromId: number
    VendorToId: number
    Editable: boolean
    ExpectedIncomeDate: string
    Comment?: string
  }
}

export type PutAsnArgs = {
  Asn: {
    AsnId: number
    No: string
    ExtNo: string
    WarehouseFromId: number
    WarehouseToId: number
    SupplierId: number
    VendorFromId: number
    VendorToId: number
    Editable: boolean
    ExpectedIncomeDate: string
    Comment?: string
  }
}

export type DeleteAsnArgs = {
  AsnId: number
}

export type GetAsnArgs = {
  DateFrom: string
  DateTo: string
}

export type Asn = {
  asnId: number
  no: string
  extNo: string
  comment: string
  incomingNo: string
  incomingState: string
  client: Client
  clientId: number
  clientLabel: string
  clientCode: string
  warehouse: Warehouse
  organization: Warehouse
  operator: string
  creationDate: string
  shipmentDate: string
  editable: boolean
  removal: boolean
}

export type UploadAsnArgs = {
  FileBase64: string
  FileName: string
}

export type UploadAsnResponse = {
  result?: string
  Error?: string
}
