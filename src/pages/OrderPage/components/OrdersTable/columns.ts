import { ColumnsNameItemProps } from '@components/ColumnsSetter/types'
import { OrderRow } from './OrdersTable'

export type ColumnsNameProps = { [key: string]: ColumnsNameItemProps<OrderRow> }

export const columnsName: ColumnsNameProps = {
  no: { title: 'Номер', accessor: 'no' },
  creationDate: { title: 'Создан', accessor: 'creationDate' },
  status: { title: 'Статус', accessor: 'status' },
  clientCode: { title: 'Код клиента', accessor: 'clientCode' },
  clientLabel: { title: 'Клиент', accessor: 'clientLabel' },
  amNumber: { title: 'Номер а/м', accessor: 'amNumber' },
  driver: { title: 'Водитель', accessor: 'driver' },
  removal: { title: '', accessor: 'removal', isRequired: true },
}
