import { useCallback, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import CombinedTable from '@components/Table/CombinedTable'
import { Table, TableColumn, TableRenderCell, TableRenderHeaderCell } from '@consta/table/Table'
import HeaderCell from '@shared/HeaderCell'
import SorterIcon from '@components/SorterIcon/SorterIcon'
import { Checkbox } from '@consta/uikit/Checkbox'
import { Good } from '@store/types/goodApi'
import DataCell from '@shared/DataCell'
import { Layout } from '@consta/uikit/Layout'
import { Text } from '@consta/uikit/Text'
import CommonRowSetter from '@components/RowSetter/CommonRowSetter'
import { RepShippedPalletPlacesInputs } from 'types/report/report'
import { tcsApi } from '@store/services/tcsApi'
import { Tcs } from '@store/types/tcsApi'

import styles from '../../styles.module.css'

type TcsTableLine = Tcs & any

type TcsTableProps = {
  className?: string
}

export const TcsTable = ({ className }: TcsTableProps) => {
  const { setValue } = useFormContext<RepShippedPalletPlacesInputs>()

  const [selectedRows, setSelectedRows] = useState<TcsTableLine[]>([])

  const { data: tcsData, isLoading } = tcsApi.useGetTcsQuery()

  const handleRowSelection = (row: TcsTableLine) => {
    const isInSelectedRows = selectedRows.find(({ id }) => id === row.id)

    const newRows = isInSelectedRows
      ? selectedRows.filter(({ id }) => id !== row.id)
      : [...selectedRows, row]

    setValue('tcs', newRows)
    setSelectedRows(newRows)
  }

  const codeField = useCallback(
    ({ row }: Parameters<TableRenderCell<TcsTableLine>>[0]) => {
      return <DataCell row={row} value={row.code} />
    },
    [tcsData?.Tcs],
  )

  const labelField = useCallback(
    ({ row }: Parameters<TableRenderCell<TcsTableLine>>[0]) => (
      <DataCell row={row} value={row.label} />
    ),
    [],
  )

  const selectRowField = useCallback(
    ({ row }: Parameters<TableRenderCell<TcsTableLine>>[0]) => (
      <div className={styles.lineCell}>
        <Checkbox
          size="s"
          checked={!!selectedRows.find(selectedRow => row.id === selectedRow.id)}
          view="primary"
          onChange={() => {
            handleRowSelection(row)
          }}
        />
      </div>
    ),
    [selectedRows],
  )

  const columns: TableColumn<TcsTableLine>[] = [
    {
      title: '',
      accessor: 'select',
      renderCell: selectRowField,
      maxWidth: 40,
    },
    {
      title: 'Название',
      accessor: 'label',
      renderCell: labelField,
      width: '2fr',
    },
    {
      title: 'Код',
      accessor: 'code',
      renderCell: codeField,
      width: '1fr',
    },
  ]

  const handleAllRowSelection = () => {
    const rows = tcsData?.Tcs

    if (!rows?.length) return

    if (selectedRows.length === rows.length) {
      setSelectedRows([])
      setValue('tcs', [])
    } else {
      setSelectedRows(rows)
      setValue('tcs', 'Все')
    }
  }

  return (
    <Layout className={`${styles.flexedContainer} ${className}`} direction="column">
      <Text className={styles.checkedItems} size="s" view="secondary">
        Всего отмечено {selectedRows.length} из {tcsData?.Tcs?.length}
      </Text>
      <CombinedTable
        data={tcsData?.Tcs as TcsTableLine[]}
        isLoading={isLoading}
        paginationClass={styles.pagination}
        visiblePagCount={5}>
        {({ filteredData, paginatedData, sortColumn, handleSort, ...filterTableProps }) => (
          <Table
            stickyHeader
            className={styles.table}
            rows={paginatedData}
            headerZIndex={1}
            getRowKey={row => row.id}
            onRowClick={row => handleRowSelection(row)}
            columns={columns.map(column => ({
              ...column,
              renderHeaderCell: ({ tableRef, ...props }: Parameters<TableRenderHeaderCell>[0]) => {
                if (column.accessor === 'select') {
                  return (
                    <HeaderCell
                      onClick={handleAllRowSelection}
                      className={styles.checkboxHeader}
                      controlLeft={
                        <Checkbox
                          size="s"
                          checked={
                            Boolean(selectedRows.length) &&
                            selectedRows.length === tcsData?.Tcs?.length
                          }
                          view="primary"
                          disabled={isLoading}
                        />
                      }
                    />
                  )
                }

                return (
                  <HeaderCell
                    className={column.accessor === sortColumn ? styles.activeHeaderCell : ''}
                    controlRight={
                      column.title
                        ? [
                            <CommonRowSetter
                              accessor={column.accessor || 'article'}
                              items={tcsData?.Tcs}
                              {...filterTableProps}
                            />,
                          ]
                        : null
                    }
                    icon={(() =>
                      column.title ? (
                        <SorterIcon isActive={column.accessor === sortColumn} />
                      ) : undefined)()}
                    onClick={() => handleSort((column.accessor as keyof TcsTableLine) || 'id')}
                    {...props}
                  />
                )
              },
            }))}
          />
        )}
      </CombinedTable>
    </Layout>
  )
}
