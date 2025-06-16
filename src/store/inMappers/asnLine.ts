import { AsnLineResponse } from '@store/types/asnLineApi'

export const asnLineMapper = (asnLine: AsnLineResponse) => {
  const { GoodsItem, MU } = asnLine

  return {
    id: asnLine.AsnLineId,
    good: {
      id: GoodsItem.GoodItemId,
      article: GoodsItem.Code,
      brutto: GoodsItem.Brutto,
      height: GoodsItem.Height,
      length: GoodsItem.Length,
      label: GoodsItem.Name,
      netto: GoodsItem.Netto,
      width: GoodsItem.Width,
    },
    goodArticle: GoodsItem.Code,
    goodLabel: GoodsItem.Name,
    bbd: asnLine.BBD,
    comment: asnLine.Comment,
    count: asnLine.Count,
    lot: asnLine.Lot,
    measurementUnit: {
      id: MU.MuId,
      label: MU.Name,
      extId: MU.ExtMuId,
      extLabel: MU.ExtName,
    },
    status: '',
    stockStatus: asnLine.StockStatus,
    MU: MU.Name,
  }
}
