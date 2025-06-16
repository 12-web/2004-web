export type GoodResponse = {
  Article: string
  Brutto: number
  GoodItemId: number
  Height: number
  Length: number
  Name: string
  Netto: number
  Width: number
}

export type GetGoodsResponse = {
  GoodsItems?: GoodResponse[]
  Error?: string
}

export type Good = {
  id: number
  article: string
  brutto: number
  height: number
  length: number
  label: string
  netto: number
  width: number
}

export type Goods = Good[]
