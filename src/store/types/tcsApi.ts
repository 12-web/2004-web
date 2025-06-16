export type TcsResponse = {
  ClientId: number
  Code: string
  Name: string
}

export type Tcs = {
  id: number
  label: string
  code: string
}

export type GetTcsResponse = {
  ClientList?: TcsResponse[]
  Error?: string
}

export type TransformGetTcsResponse = { Tcs?: Tcs[]; Error?: string }
