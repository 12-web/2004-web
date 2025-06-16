import { useMemo } from 'react'
import { default as RowSetterUI } from '@components/RowSetter/RowSetter'
import { AsnRow } from '../AsnTable/AsnTable'
import { Asn } from '@store/types/asnApi'
import { formatDateFromISO } from '@utils/dates'
import { ChildrenFilterProps } from '@components/Table/FilteredTable/types'

type RowSetterProps = {
  asnList: AsnRow[]
  accessor: keyof AsnRow
} & Omit<ChildrenFilterProps<AsnRow>, 'filteredData'>

const RowSetter = ({ asnList, ...props }: RowSetterProps) => {
  const { accessor, openedFilter } = props

  const checkboxes = useMemo(() => {
    return asnList.map(item => {
      let name

      if (accessor) {
        if (accessor === 'creationDate' || accessor === 'shipmentDate') {
          name = formatDateFromISO(item[accessor])
        } else {
          name = item[accessor]
        }
      }

      return {
        name: name || '(Пусто)',
        value: accessor ? item[accessor]!.toString() : '',
      } as { name: keyof Asn; value: string }
    })
  }, [asnList])

  return <RowSetterUI isOpen={openedFilter === accessor} checkboxes={checkboxes} {...props} />
}

export default RowSetter
