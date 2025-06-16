export type LotsResponse = {
  LotId: number
  LotNo: string
  BBD: string
  LifeTime: number
}

export type GetLotsResponse = {
  Lots?: LotsResponse[]
  Error?: string
}

export type Lot = {
  id: number
  label: string
  bbd: string
  lifetime: number
}

export type Lots = Lot[]
export type GetLotsArgs = {
  GoodItemId: number
}
