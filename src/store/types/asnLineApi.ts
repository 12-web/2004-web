import { Good } from './goodApi'
import { MUnit } from './measurementUnitApi'

export type PostAsnLineArgs = {
  AsnLine: {
    AsnId: number
    BBD: string
    Count: number
    ExtCount: number
    GoodsItemId: number
    MuId: number
    RegLineRo: number
    Lot: string
    RegNoRo: string
    SsccCode: string
    StockStatus: 'N' | string
    Comment?: string
  }
}

export type PutAsnLineArgs = {
  AsnLine: {
    AsnLineId: number
    AsnId: number
    BBD: string
    Count: number
    ExtCount: number
    GoodsItemId: number
    MuId: number
    RegLineRo: number
    Lot: string
    RegNoRo: string
    SsccCode: string
    StockStatus: 'N' | string
    Comment?: string
  }
}

export type AsnLine = {
  id: number
  good: Good
  goodArticle: string
  bbd: string
  comment: string
  count: string
  stockStatus: string
  lot: string
  measurementUnit: MUnit
  status: string
}

export type AsnLines = AsnLine[]

export type AsnLineResponse = {
  AsnLineId: number
  BBD: string
  Comment: string
  Count: string
  ExtCount: string
  GoodsItem: {
    GoodItemId: number
    Code: string
    Name: string
    Height: number
    Width: number
    Brutto: number
    Length: number
    Netto: number
  }
  Gtd: {
    GtdId: number
    No: string
  }
  GtdLineNo: number
  Lot: string
  MU: {
    MuId: number
    Name: string
    ExtMuId: number
    ExtName: string
  }
  PRD: string
  RegLineRo: number
  RegNoRo: number
  Sertificate: {
    WarehouseId: number
    Code: string
  }
  SsccCode: string
  StockStatus: string
}

export type GetAsnLineResponse = {
  AsnLine?: AsnLineResponse[]
  Error?: string
}

export type PostAsnLineResponse = {
  AsnLineId?: number
  Error?: string
}

export type PutAsnLineResponse = {
  result?: string
  Error?: string
}

export type DeleteAsnLineResponse = {
  result?: string
  Error?: string
}
