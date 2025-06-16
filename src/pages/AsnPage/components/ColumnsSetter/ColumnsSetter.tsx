import { useDispatch } from 'react-redux'
import { default as ColumnsSetterUI } from '@components/ColumnsSetter/ColumnsSetter'
import { ColumnsNameItemProps } from '@components/ColumnsSetter/types'
import { columnsName } from '../AsnTable/columns'
import { AsnRow } from '../AsnTable/AsnTable'
import { setAsnColumns } from '@store/reducers/AsnTable/AsnTableSlice'

const ColumnsSetter = () => {
  const dispatсh = useDispatch()

  const handleSetCols = (value: ColumnsNameItemProps<AsnRow>[] | null) =>
    dispatсh(setAsnColumns({ columns: value }))

  return (
    <ColumnsSetterUI
      onSetTableCols={handleSetCols}
      cols={Object.values(columnsName).filter(col => col.title)}
    />
  )
}

export default ColumnsSetter
