import { ColumnsNameItemProps } from '@components/ColumnsSetter/types'
import { AsnRow } from './AsnTable'

export type ColumnsNameProps = { [key: string]: ColumnsNameItemProps<AsnRow> }

export const columnsName: ColumnsNameProps = {
  no: { title: 'Номер ASN', accessor: 'no' },
  creationDate: { title: 'Дата', accessor: 'creationDate' },
  shipmentDate: { title: 'Дата ф. прихода', accessor: 'shipmentDate' },
  incomingState: { title: 'Статус прихода', accessor: 'incomingState' },
  incomingNo: { title: 'Номер прихода', accessor: 'incomingNo' },
  clientCode: { title: 'Код клиента', accessor: 'clientCode' },
  clientLabel: { title: 'Клиент', accessor: 'clientLabel' },
  removal: { title: '', accessor: 'removal', isRequired: true },
}
