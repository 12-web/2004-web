import { formatDateISO } from '@utils/dates'
import { PostOrderArgs, PutOrderArgs } from '@store/types/orderApi'
import { PostOrderLineArgs, PutOrderLineArgs } from '@store/types/orderLineApi'
import { Inputs, OrderLineInput } from 'types/order/order'

export const postOrderClientToServer = (inputs: Inputs): PostOrderArgs => ({
  Order: {
    No: inputs.orderNumber,
    LoadingDateTimeStart: formatDateISO(new Date(inputs.loadStartDate)) || '',
    LoadingDateTimeEnd: formatDateISO(new Date(inputs.loadEndDate)) || '',
    DepartureActualDateTime: formatDateISO(new Date(inputs.departureDate)) || '',
    DateShipment: formatDateISO(new Date(inputs.shipmentDate)) || '',
    DateCreation: formatDateISO(new Date(inputs.creationDate)) || '',
    ClientId: inputs.client.id,
    ShipmentAddressId: inputs.shipmentAddress.id,
    WarehouseId: inputs.warehouse.id,
    VendorId: inputs.client.id,
    SealNo: inputs.sealNumber,
    Driver: inputs.driver,
    ShipmentId: -1,
    CarNo: inputs.amNumber,
    TN_No: '',
    FindingTS: '',
  },
})

export const putOrderClientToServer = (inputs: Inputs, orderId: number): PutOrderArgs => ({
  Order: {
    OrderId: orderId,
    No: inputs.orderNumber,
    ClientId: inputs.client.id,
    ShipmentAddressId: inputs.shipmentAddress.id,
    WarehouseId: inputs.warehouse.id,
    VendorId: 0,
    LoadingDateTimeStart: formatDateISO(new Date(inputs.loadStartDate)) || '',
    LoadingDateTimeEnd: formatDateISO(new Date(inputs.loadEndDate)) || '',
    DepartureActualDateTime: formatDateISO(new Date(inputs.departureDate)) || '',
    DateShipment: formatDateISO(new Date(inputs.shipmentDate)) || '',
    DateCreation: formatDateISO(new Date(inputs.creationDate)) || '',
    FindingTS: '',
    ShipmentId: -1,
    CarNo: inputs.amNumber,
    SealNo: inputs.sealNumber,
    TN_No: '',
    Driver: inputs.driver,
  },
})

export const postOrderLineClientToServer = (
  inputs: OrderLineInput,
  orderId: number,
): PostOrderLineArgs => {
  return {
    OrderLine: {
      OrderId: orderId,
      GoodItemId: inputs.good.id,
      LotId: inputs.lot.id,
      MuId: inputs.measurementUnit.id,
      BBD: formatDateISO(inputs.bbd) || '',
      Count: parseInt(inputs.count),
    },
  }
}

export const putOrderLineClientToServer = (
  inputs: OrderLineInput,
  orderLineId: number,
): PutOrderLineArgs => {
  return {
    OrderLine: {
      OrderLineId: orderLineId,
      GoodItemId: inputs.good.id,
      LotId: inputs.lot?.id,
      MuId: inputs.measurementUnit.id,
      BBD: formatDateISO(inputs.bbd) || '',
      Count: parseInt(inputs.count),
    },
  }
}
