import { TcsResponse } from '@store/types/tcsApi'

export const tscMapper = (org: TcsResponse) => {
  return {
    id: org.ClientId,
    label: org.Name,
    code: org.Code,
  }
}
