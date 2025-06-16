export type SuppliersResponse = {
  ClientId: number
  Code: string
  Name: string
}

export type GetSuppliersResponse = {
  ClientList?: SuppliersResponse[]
  Error?: string
}

export type TransformGetSuppliersResponse = {
  Suppliers?: Supplier[]
  Error?: string
}

export type Supplier = {
  id: number
  label: string
  code: string
  address?: string
}

export type PostSuppliersArgs = {
  newName: string
  newCode: string
  newAddr: string
  Type: 4
}
export type PostSuppliersResponse = {
  result?: boolean
  Error?: string
}
