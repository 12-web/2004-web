import { MUResponse } from '@store/types/measurementUnitApi'

export const muMapper = (mu: MUResponse) => {
  return {
    id: mu.MuId,
    label: mu.Name,
    extId: mu.ExtMuId,
    extLabel: mu.ExtName,
  }
}
