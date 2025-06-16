import { WarehousesResponse } from '@store/types/warehouseApi'

export const warehouseMapper = (warehouse: WarehousesResponse) => {
  return {
    id: warehouse.WarehouseId,
    label: warehouse.Name,
    code: warehouse.Code,
    shippingWarehouse: warehouse.ShippingWarehouse,
  }
}
