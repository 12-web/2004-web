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
import { RepOrderStatusInputs } from 'types/report/report'
import { organizationApi } from '@store/services/organizationApi'

import styles from '../../styles.module.css'

type VendorTableLine = Good & any

type VendorsTableProps = {
  className?: string
}

export const VendorsTable = ({ className }: VendorsTableProps) => {
  const { setValue } = useFormContext<RepOrderStatusInputs>()

  const [selectedRows, setSelectedRows] = useState<VendorTableLine[]>([])

  const { data: orgsData, isLoading } = organizationApi.useGetOrganizationQuery()

  const handleRowSelection = (row: VendorTableLine) => {
    const isInSelectedRows = selectedRows.find(({ id }) => id === row.id)

    const newRows = isInSelectedRows
      ? selectedRows.filter(({ id }) => id !== row.id)
      : [...selectedRows, row]

    setValue('vendors', newRows)
    setSelectedRows(newRows)
  }

  const codeField = useCallback(
    ({ row }: Parameters<TableRenderCell<VendorTableLine>>[0]) => {
      return <DataCell row={row} value={row.code} />
    },
    [orgsData?.Organizations],
  )

  const labelField = useCallback(
    ({ row }: Parameters<TableRenderCell<VendorTableLine>>[0]) => (
      <DataCell row={row} value={row.label} />
    ),
    [],
  )

  const selectRowField = useCallback(
    ({ row }: Parameters<TableRenderCell<VendorTableLine>>[0]) => (
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

  const columns: TableColumn<VendorTableLine>[] = [
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
    const rows = orgsData?.Organizations

    if (!rows?.length) return

    if (selectedRows.length === rows.length) {
      setSelectedRows([])
      setValue('vendors', [])
    } else {
      setSelectedRows(rows)
      setValue('vendors', 'Все')
    }
  }

  return (
    <Layout className={`${styles.flexedContainer} ${className}`} direction="column">
      <Text className={styles.checkedItems} size="s" view="secondary">
        Всего отмечено {selectedRows.length} из {orgsData?.Organizations?.length}
      </Text>
      <CombinedTable
        data={orgsData?.Organizations as VendorTableLine[]}
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
                            selectedRows.length === orgsData?.Organizations?.length
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
                              items={orgsData?.Organizations}
                              {...filterTableProps}
                            />,
                          ]
                        : null
                    }
                    icon={(() =>
                      column.title ? (
                        <SorterIcon isActive={column.accessor === sortColumn} />
                      ) : undefined)()}
                    onClick={() => handleSort((column.accessor as keyof VendorTableLine) || 'id')}
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
