export type OrganizationsResponse = {
  ClientId: number
  Code: string
  Name: string
}

export type Organization = {
  id: number
  label: string
  code: string
}

export type GetOrganizationsResponse = {
  OrganizationsList?: OrganizationsResponse[]
  Error?: string
}

export type TransformGetOrganizationsResponse = { Organizations?: Organization[]; Error?: string }
