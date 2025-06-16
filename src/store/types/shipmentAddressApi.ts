export type ShipAddressesResponse = {
  ClientId: number
  Code: string
  Name: string
}

export type ShipAddress = {
  id: number
  label: string
  code: string
}

export type GetShipAddressesResponse = {
  Client?: ShipAddressesResponse[]
  Error?: string
}

export type TransformGetShipAddressesResponse = { ShipAddresses?: ShipAddress[]; Error?: string }

export type GetShipAddressesArgs = {
  ClientId: number
}

export type PostShipAddressResponse = {
  result?: boolean
  Error?: string
}

export type PostShipAddressArgs = {
  newName: string
  newCode: string
  newAddr: string
  orgId: number
}
