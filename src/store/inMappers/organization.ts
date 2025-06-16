import { OrganizationsResponse } from '@store/types/organizationApi'

export const organizationMapper = (org: OrganizationsResponse) => {
  return {
    id: org.ClientId,
    label: org.Name,
    code: org.Code,
  }
}
