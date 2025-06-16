export type WarehousesResponse = {
  WarehouseId: number
  Code: string
  Name: string
  ShippingWarehouse: number
}

export type Warehouse = {
  id: number
  label: string
  code: string
  shippingWarehouse: number
}

export type GetWarehousesResponse = {
  Warehouse?: WarehousesResponse[]
  Error?: string
}

export type TransformGetWarehousesResponse = {
  Warehouse?: Warehouse[]
  Error?: string
}
