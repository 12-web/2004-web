import { OrderLineResponse } from '@store/types/orderLineApi'

export const orderLineMapper = (orderLine: OrderLineResponse) => {
  return {
    id: orderLine.OrderLineId,
    bbd: orderLine.BBD,
    prd: orderLine.PRD,
    count: orderLine.Count,
    measurementUnit: {
      id: orderLine.MU.MuId,
      label: orderLine.MU.Name,
      extId: orderLine.MU.ExtMuId,
      extLabel: orderLine.MU.ExtName,
    },
    lot: {
      id: orderLine.Lot.LotId,
      label: orderLine.Lot.LotNo,
      bbd: new Date().toString(),
      lifetime: 0,
    },
    good: {
      id: orderLine.GoodItem.GoodItemId,
      article: orderLine.GoodItem.Code,
      label: orderLine.GoodItem.Name,
      brutto: 0,
      height: 0,
      length: 0,
      netto: 0,
      width: 0,
    },
    goodArticle: orderLine.GoodItem.Code,
    goodLabel: orderLine.GoodItem.Name,
    lotNo: orderLine.Lot.LotNo,
    MU: orderLine.MU.Name,
  }
}
