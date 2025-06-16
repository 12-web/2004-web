import { LotsResponse } from '@store/types/lotApi'

export const lotMapper = (lot: LotsResponse) => {
  return {
    id: lot.LotId,
    label: lot.LotNo,
    bbd: lot.BBD,
    lifetime: lot.LifeTime,
  }
}
