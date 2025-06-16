import { ColumnsNameItemProps } from '@components/ColumnsSetter/types'
import { AsnRow } from '@pages/AsnPage/components/AsnTable/AsnTable'

export type AsnTable = {
  columns: ColumnsNameItemProps<AsnRow>[] | null
  rows: AsnRow[]
}

export type AsnTableColumns = {
  columns: ColumnsNameItemProps<AsnRow>[] | null
}

export type AsnTableRows = {
  rows: AsnRow[]
}
