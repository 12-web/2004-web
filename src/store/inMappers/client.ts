import { ClientsResponse } from '@store/types/clientApi'

export const clientMapper = (client: ClientsResponse) => {
  return {
    id: client.ClientId,
    label: client.Name,
    code: client.Code,
  }
}
