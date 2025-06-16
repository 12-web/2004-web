export type ClientsResponse = {
  ClientId: number
  Code: string
  Name: string
}

export type GetClientsResponse = {
  ClientList?: ClientsResponse[]
  Error?: string
}

export type Client = {
  id: number
  label: string
  code: string
}

export type Clients = Client[]

export const ClientTypes = {
  client: 1,
  supplier: 4,
} as const

export type ClientTypeProps = (typeof ClientTypes)[keyof typeof ClientTypes]

export type PostClientsArgs = {
  newName: string
  newCode: string
  newAddr: string
  Type: ClientTypeProps
}
export type PostClientsResponse = {
  result?: boolean
  Error?: string
}
