import { Text } from '@consta/uikit/Text'
import { DataCell as DataCellConsta } from '@consta/table/DataCell'
import styles from './DataCell.module.css'

type DataCellProps<DATA> = {
  onClick?: (row: DATA) => void
  row: DATA
  value?: string | number
}

const DataCell = <DATA,>({ onClick, row, value }: DataCellProps<DATA>) => {
  return (
    <DataCellConsta className={styles.root} size="s" onClick={() => onClick?.(row)}>
      <Text size="s" view={onClick ? 'brand' : 'primary'}>
        {value}
      </Text>
    </DataCellConsta>
  )
}

export default DataCell
