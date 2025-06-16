import { Client } from './clientApi'
import { ShipAddress } from './shipmentAddressApi'
import { Warehouse } from './warehouseApi'

export type PostOrderArgs = {
  Order: {
    No: string
    ClientId: number
    ShipmentAddressId: number
    WarehouseId: number
    VendorId: number
    LoadingDateTimeStart: string
    LoadingDateTimeEnd?: string
    DepartureActualDateTime: string
    DateShipment?: string
    DateCreation: string
    FindingTS?: string
    ShipmentId?: -1
    CarNo?: string
    SealNo?: string
    TN_No?: string
    Driver?: string
  }
}
export type PutOrderArgs = {
  Order: {
    OrderId: number
    No: string
    ClientId: number
    ShipmentAddressId: number
    WarehouseId: number
    VendorId: number
    LoadingDateTimeStart: string
    LoadingDateTimeEnd?: string
    DepartureActualDateTime: string
    DateShipment?: string
    DateCreation: string
    FindingTS?: string
    ShipmentId?: -1
    CarNo?: string
    SealNo?: string
    TN_No?: string
    Driver?: string
  }
}

export type OrderResponse = {
  OrderId: number
  No: string
  DateCreation: string
  DateShipment: string
  Client: {
    ClientId: number
    Code: string
    Name: string
  }
  StatusCode: number
  Status: string
  SealNo: string
  TN_No: string
  TN_FileSize: number
  CarNo: string
  Driver: string
  Operator: string
  Editable: boolean
  ShipmentAddress: {
    ClientId: number
    Code: string
    Name: string
  }
  Warehouse: {
    WarehouseId: number
    Code: string
    Name: string
  }
  Vendor: {
    WarehouseId: number
    Code: string
    Name: string
  }
  Shipment: {
    ShipmentId: number
    Code: string
  }
  LoadingDateTimeStart: string
  LoadingDateTimeEnd: string
  DepartureActualDateTime: string
  FindingTS: string
}

export type Order = {
  orderId: number
  no: string
  client: Client
  clientId: number
  clientCode: string
  clientLabel: string
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
  editable: boolean
  status?: string
  removal: boolean
}

export type GetOrdersArgs = {
  DateFrom: string
  DateTo: string
}

export type GetOrderArgs = {
  OrderId: number
}

export type DeleteOrderArgs = {
  OrderId: number
}

export type RunOrderArgs = {
  OrderId: number
  StatusCode: number
}

export type RunOrdersResponse = {
  result?: string
  Error?: string
}

export type GetOrdersResponse = {
  Order?: OrderResponse[]
  Error?: string
}

export type GetOrderResponse = {
  Order?: OrderResponse
  Error?: string
}

export type DeleteOrdersResponse = {
  result?: string
  Error?: string
}

export type PostOrderResponse = {
  OrderId?: number
  Error?: string
}

export type PutOrderResponse = {
  result?: string
  Error?: string
}

export type UploadOrderArgs = {
  FileBase64: string
  FileName: string
}

export type UploadOrderResponse = {
  result?: string
  Error?: string
}
