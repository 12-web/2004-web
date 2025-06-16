import { PostShipAddressArgs } from '@store/types/shipmentAddressApi'
import { Inputs } from 'types/address/address'

export const postAddressToServer = (address: Inputs): PostShipAddressArgs => ({
  newName: address.label,
  newCode: address.code,
  newAddr: address.address,
  orgId: address.client.id,
})
