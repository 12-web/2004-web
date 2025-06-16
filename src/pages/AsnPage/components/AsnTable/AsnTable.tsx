import { Table, TableColumn, TableRenderHeaderCell } from '@consta/table/Table'
import { Text } from '@consta/uikit/Text'
import { IconTrash } from '@consta/icons/IconTrash'
import { Asn } from '@store/types/asnApi'
import { formatDateFromISO, formatDateISO } from '@utils/dates'
import { ReactNode, useCallback, useMemo, useState } from 'react'
import SorterIcon from '@components/SorterIcon/SorterIcon'
import AsnRowSetter from '../RowSetter/RowSetter'
import { columnsName } from './columns'
import { useAppDispatch, useAppSelector } from '@hooks/redux'
import { Button } from '@consta/uikit/Button'
import modals from '@utils/modals'
import { opened } from '@store/reducers/Modal/ModalOpenSlice'
import { setAsn } from '@store/reducers/Asn/AsnDataSlice'
import HeaderCell from '@shared/HeaderCell'
import IncomingState from '../IncomingState/IncomingState'
import CombinedTable from '@components/Table/CombinedTable'
import { DataCell } from '@consta/table/DataCell'
import { setAsnRows } from '@store/reducers/AsnTable/AsnTableSlice'
import { Layout } from '@consta/uikit/Layout'
import { useDateFilter } from '@hooks/useDateFilter'
import { asnApi } from '@store/services/asnApi'
import AsnTableHandles from '../AsnTableHandles'

import styles from './styles.module.css'

type AsnTableProps = {
  onEditAsn: (row: AsnRow) => void
}

export type AsnRow = Asn & {
  removal?: ReactNode
  isRequired?: boolean
}

const AsnTable = ({ onEditAsn }: AsnTableProps) => {
  const filtersData = useDateFilter()

  const [search, setSearch] = useState<string | null>(null)

  const dispatch = useAppDispatch()

  const { data, isLoading } = asnApi.useGetAsnQuery({
    DateFrom: formatDateISO(filtersData.startDate) || '',
    DateTo: formatDateISO(filtersData.endDate) || '',
  })

  const searchedData: AsnRow[] = useMemo(() => {
    return (
      data?.Asn?.filter(asn => asn.no.toLowerCase().startsWith(search?.toLowerCase() || '')) || []
    )
  }, [search, data])

  const { columns } = useAppSelector(state => state.asnTableState)

  const handleDeleteClick = (asn: AsnRow) => {
    dispatch(setAsn({ asn }))
    dispatch(opened(modals.DELETE_ASN_MODAL_ID))
  }

  const tableColumns = useMemo(() => {
    const defaultColumns: TableColumn<AsnRow>[] = [
      {
        ...columnsName['no'],
        minWidth: 180,
        renderCell: ({ row }) => (
          <DataCell
            style={{ cursor: 'pointer' }}
            className={styles.cell}
            onClick={() => onEditAsn(row)}>
            <Text size="s" view="brand">
              {row.no ? row.no : '-'}
            </Text>
          </DataCell>
        ),
      },
      {
        ...columnsName['creationDate'],
        minWidth: 180,
        renderCell: ({ row }) => (
          <DataCell className={styles.cell}>
            <Text size="s">{row.creationDate ? formatDateFromISO(row.creationDate) : '-'}</Text>
          </DataCell>
        ),
      },
      {
        ...columnsName['shipmentDate'],
        minWidth: 180,
        renderCell: ({ row }) => (
          <DataCell className={styles.cell}>
            <Text size="s">{row.shipmentDate ? formatDateFromISO(row.shipmentDate) : '-'}</Text>
          </DataCell>
        ),
      },
      {
        ...columnsName['incomingState'],
        minWidth: 180,
        renderCell: ({ row }) => (
          <DataCell className={styles.cell}>
            <IncomingState status={row.incomingState ? row.incomingState : '-'} />
          </DataCell>
        ),
      },
      {
        ...columnsName['incomingNo'],
        minWidth: 180,
        renderCell: ({ row }) => (
          <DataCell className={styles.cell}>
            <Text size="s">{row.incomingNo ? row.incomingNo : '-'}</Text>
          </DataCell>
        ),
      },
      {
        ...columnsName['clientCode'],
        minWidth: 180,
        renderCell: ({ row }) => (
          <DataCell className={styles.cell}>
            <Text size="s">{row.clientCode ? row.clientCode : '-'}</Text>
          </DataCell>
        ),
      },
      {
        ...columnsName['clientLabel'],
        minWidth: 180,
        renderCell: ({ row }) => (
          <DataCell className={styles.cell}>
            <Text size="s">{row.clientLabel ? row.clientLabel : '-'}</Text>
          </DataCell>
        ),
      },
      {
        title: '',
        accessor: 'removal',
        maxWidth: 40,
        renderCell: ({ row }) => (
          <DataCell className={styles.cellButton}>
            <Button
              size="s"
              view="clear"
              iconRight={IconTrash}
              onlyIcon
              onClick={() => handleDeleteClick(row)}
              disabled={!row.removal}
            />
          </DataCell>
        ),
        renderHeaderCell: HeaderCell,
      },
    ]

    return defaultColumns.filter(
      ({ accessor }) =>
        columns?.some(col => col.accessor === accessor) || columnsName[accessor || ''].isRequired,
    )
  }, [columns])

  const handleSetTableRows = useCallback((data: AsnRow[]) => {
    dispatch(setAsnRows(data))
  }, [])

  return (
    <CombinedTable
      onSetRows={handleSetTableRows}
      data={searchedData}
      isLoading={isLoading}
      paginationClass={styles.pagination}>
      {({ paginatedData, sortColumn, handleSort, ...filterTableProps }) => (
        <>
          <AsnTableHandles
            {...filtersData}
            setSearch={setSearch}
            search={search}
            onResetFilters={filterTableProps.resetFilters}
          />
          <Layout direction="column">
            <Table
              className={styles.table}
              rows={paginatedData}
              stickyHeader
              headerZIndex={1}
              getRowKey={row => row.asnId}
              columns={tableColumns.map(column => ({
                ...column,
                renderHeaderCell: ({
                  tableRef,
                  ...props
                }: Parameters<TableRenderHeaderCell>[0]) => (
                  <HeaderCell
                    isActive={column.accessor === sortColumn}
                    controlRight={
                      column.title
                        ? [
                            <AsnRowSetter
                              accessor={column.accessor || Object.values(columnsName)[0].accessor}
                              asnList={searchedData}
                              {...filterTableProps}
                            />,
                          ]
                        : null
                    }
                    icon={(() =>
                      column.title ? (
                        <SorterIcon isActive={column.accessor === sortColumn} />
                      ) : undefined)()}
                    onClick={() => handleSort(column.accessor || 'asnId')}
                    {...props}
                  />
                ),
              }))}
            />
          </Layout>
        </>
      )}
    </CombinedTable>
  )
}

export default AsnTable
