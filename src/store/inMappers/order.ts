import { OrderResponse } from '@store/types/orderApi'
import { resetISODateHours } from '@utils/dates'

export const orderMapper = (order: OrderResponse) => {
  return {
    orderId: order.OrderId,
    no: order.No,
    client: {
      label: order.Client.Name,
      id: order.Client.ClientId,
      code: order.Client.Code,
    },
    clientId: order.Client.ClientId,
    clientLabel: order.Client.Name,
    clientCode: order.Client.Code,
    shipmentAddress: {
      label: order.ShipmentAddress.Name,
      id: order.ShipmentAddress.ClientId,
      code: order.ShipmentAddress.Code,
    },
    warehouse: {
      label: order.Warehouse.Name,
      id: order.Warehouse.WarehouseId,
      code: order.Warehouse.Code,
      shippingWarehouse: 0,
    },
    driver: order.Driver,
    amNumber: order.CarNo,
    sealNumber: order.SealNo,
    loadEndDate: order.LoadingDateTimeEnd,
    loadStartDate: order.LoadingDateTimeStart,
    departureDate: order.DepartureActualDateTime,
    creationDate: resetISODateHours(order.DateCreation),
    shipmentDate: resetISODateHours(order.DateShipment),
    editable: order.Editable,
    status: order?.Status,
    removal: order.Status === 'Редактируется' || order.Status === 'Введен',
  }
}
