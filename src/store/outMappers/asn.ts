import { PostAsnArgs, PutAsnArgs } from '@store/types/asnApi'
import { PostAsnLineArgs, PutAsnLineArgs } from '@store/types/asnLineApi'
import { formatDateISO } from '@utils/dates'
import { AsnLineInput, Inputs } from 'types/asn/asn'

export const postAsnClientToServer = (inputs: Inputs): PostAsnArgs => ({
  Asn: {
    No: inputs.no,
    ExtNo: inputs.extNo,
    Comment: inputs.comment,
    WarehouseFromId: inputs.warehouse.id,
    WarehouseToId: inputs.warehouse.id,
    SupplierId: inputs.client.id,
    VendorFromId: inputs.organization.id,
    VendorToId: inputs.organization.id,
    Editable: true,
    ExpectedIncomeDate: formatDateISO(new Date(inputs.shipmentDate)) || '',
  },
})

export const putAsnClientToServer = (inputs: Inputs, asnId: number): PutAsnArgs => ({
  Asn: {
    AsnId: asnId,
    No: inputs.no,
    ExtNo: inputs.extNo,
    Comment: inputs.comment,
    WarehouseFromId: inputs.warehouse.id,
    WarehouseToId: inputs.warehouse.id,
    SupplierId: inputs.client.id,
    VendorFromId: inputs.organization.id,
    VendorToId: inputs.organization.id,
    Editable: true,
    ExpectedIncomeDate: formatDateISO(new Date(inputs.shipmentDate)) || '',
  },
})

export const postAsnLineClientToServer = (inputs: AsnLineInput, asnId: number): PostAsnLineArgs => {
  return {
    AsnLine: {
      AsnId: asnId,
      GoodsItemId: inputs.good.id,
      Count: parseInt(inputs.count),
      MuId: inputs.measurementUnit.id,
      StockStatus: 'N', //inputs.stockStatus.id
      BBD: formatDateISO(new Date(inputs.bbd)) || '',
      Comment: inputs.comment,
      Lot: inputs.lot,
      ExtCount: 0,
      RegLineRo: 0,
      SsccCode: '',
      RegNoRo: '',
    },
  }
}

export const putAsnLineClientToServer = (
  inputs: AsnLineInput,
  asnId: number,
  asnLineId: number,
): PutAsnLineArgs => {
  return {
    AsnLine: {
      AsnLineId: asnLineId,
      AsnId: asnId,
      GoodsItemId: inputs.good.id,
      Count: parseInt(inputs.count),
      MuId: inputs.measurementUnit.id,
      StockStatus: 'N', //inputs.stockStatus.id
      BBD: formatDateISO(new Date(inputs.bbd)) || '',
      Lot: inputs.lot,
      ExtCount: 0,
      SsccCode: '',
      RegNoRo: '',
      RegLineRo: 0,
      Comment: inputs.comment,
    },
  }
}
