import { ColumnsNameItemProps } from '@components/ColumnsSetter/types'
import { TableColumn } from '@consta/table/Table'
import { Good } from '@store/types/goodApi'

export type ColumnsNameProps = { [key: string]: ColumnsNameItemProps<Good> }

export const columnsName: ColumnsNameProps = {
  article: { title: 'Артикул', accessor: 'article' },
  label: { title: 'Наименование', accessor: 'label' },
  height: { title: 'Высота', accessor: 'height' },
  width: { title: 'Ширина', accessor: 'width' },
  length: { title: 'Длина', accessor: 'length' },
  netto: { title: 'Нетто', accessor: 'netto' },
  brutto: { title: 'Брутто', accessor: 'brutto' },
}

export const columns: TableColumn<Good>[] = [
  {
    ...columnsName['article'],
    minWidth: 150,
  },
  {
    ...columnsName['label'],
    width: 'auto',
  },
  {
    ...columnsName['height'],
    minWidth: 100,
  },
  {
    ...columnsName['width'],
    minWidth: 100,
  },
  {
    ...columnsName['length'],
    minWidth: 100,
  },
  {
    ...columnsName['netto'],
    minWidth: 100,
  },
  {
    ...columnsName['brutto'],
    minWidth: 100,
  },
]
