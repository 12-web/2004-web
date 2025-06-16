import { ClientTypeProps, PostClientsArgs } from '@store/types/clientApi'
import { Inputs } from 'types/client/client'

export const postClientClientToServer = (
  client: Inputs,
  clientType: ClientTypeProps,
): PostClientsArgs => ({
  newName: client.label,
  newCode: client.code,
  newAddr: client.address,
  Type: clientType,
})
