import { Good } from './goodApi'
import { Lot } from './lotApi'
import { MUnit } from './measurementUnitApi'

export type PostOrderLineArgs = {
  OrderLine: {
    OrderId: number
    GoodItemId: number
    LotId: number
    MuId: number
    BBD: string
    Count: number
  }
}
export type PutOrderLineArgs = {
  OrderLine: {
    OrderLineId: number
    GoodItemId: number
    LotId: number
    MuId: number
    BBD: string
    Count: number
  }
}
export type DeleteOrderLineArgs = {
  OrderLineId: number
}

export type OrderLineResponse = {
  OrderLineId: number
  BBD: string
  PRD: string
  BaseMU: string
  QtyInBaseMU: number
  LotId: number
  GTD: string
  SSCC: string
  MuId: number
  Count: number
  GoodItem: {
    GoodItemId: number
    Code: string
    Name: string
  }
  MU: {
    MuId: number
    Name: string
    ExtMuId: number
    ExtName: string
  }
  Lot: {
    LotId: number
    LotNo: string
  }
}

export type TransformGetOrderLinesResponse = { OrderLine?: OrderLine[]; Error?: string }

export type GetOrderLinesResponse = {
  OrderLine?: OrderLineResponse[]
  Error?: string
}

export type PostOrderLineResponse = {
  OrderLineId?: number
  Error?: string
}

export type PutOrderLineResponse = {
  result?: string
  Error?: string
}

export type DeleteOrderLineResponse = {
  result?: string
  Error?: string
}

export type OrderLine = {
  good: Good
  measurementUnit: MUnit
  id: number
  bbd: string
  prd: string
  count: number
  lot: Lot
}
