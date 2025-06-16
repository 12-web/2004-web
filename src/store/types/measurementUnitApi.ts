export type MUResponse = {
  MuId: number
  Name: string
  ExtMuId: number
  ExtName: string
}

export type GetMUResponse = {
  MU?: MUResponse[]
  Error?: string
}

export type MUnit = {
  id: number
  label: string
  extId: number
  extLabel: string
}

export type MUnits = MUnit[]
export type GetMUArgs = {
  GoodItemId: number
}
