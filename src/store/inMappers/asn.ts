import { AsnResponse } from '@store/types/asnApi'
import { resetISODateHours } from '@utils/dates'

export const asnMapper = (asn: AsnResponse) => {
  return {
    asnId: asn.AsnId,
    no: asn.No,
    extNo: asn.ExtNo,
    comment: asn.Comment,
    incomingNo: asn.IncomingNo,
    incomingState: asn?.IncomingState || 'Новый',
    client: {
      label: asn.Supplier.Name,
      id: asn.Supplier.ClientId,
      code: asn.Supplier.Code,
    },
    clientId: asn.Supplier.ClientId,
    clientLabel: asn.Supplier.Name,
    clientCode: asn.Supplier.Code,
    warehouse: {
      label: asn.WarehouseFrom.Name,
      id: asn.WarehouseFrom.WarehouseId,
      code: asn.WarehouseFrom.Code,
      shippingWarehouse: 0,
    },
    organization: {
      label: asn.VendorFrom.Name,
      id: asn.VendorFrom.ClientId,
      code: asn.VendorFrom.Code,
      shippingWarehouse: 0,
    },
    operator: asn.Operator,
    creationDate: resetISODateHours(asn.Date),
    shipmentDate: resetISODateHours(asn.ExpectedIncomeDate),
    editable: asn.Editable,
    removal: asn.IncomingState === 'Присвоен номер' || !asn.IncomingNo,
  }
}
