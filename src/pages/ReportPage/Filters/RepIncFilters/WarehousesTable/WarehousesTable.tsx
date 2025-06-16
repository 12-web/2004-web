import { useCallback, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import CombinedTable from '@components/Table/CombinedTable'
import { Table, TableColumn, TableRenderCell, TableRenderHeaderCell } from '@consta/table/Table'
import HeaderCell from '@shared/HeaderCell'
import SorterIcon from '@components/SorterIcon/SorterIcon'
import { Checkbox } from '@consta/uikit/Checkbox'
import DataCell from '@shared/DataCell'
import { Layout } from '@consta/uikit/Layout'
import { RepIncInputs } from 'types/report/report'
import { Text } from '@consta/uikit/Text'
import CommonRowSetter from '@components/RowSetter/CommonRowSetter'
import { Warehouse } from '@store/types/warehouseApi'
import { warehouseApi } from '@store/services/warehouseApi'

import styles from '../../styles.module.css'

type WarehousesTableLine = Warehouse & any

type WarehousesTableProps = {
  className?: string
}

export const WarehousesTable = ({ className }: WarehousesTableProps) => {
  const { setValue } = useFormContext<RepIncInputs>()

  const [selectedRows, setSelectedRows] = useState<WarehousesTableLine[]>([])

  const { data: warehousesData, isLoading } = warehouseApi.useGetWarehousesQuery()

  const handleRowSelection = (row: Warehouse) => {
    const isInSelectedRows = selectedRows.find(({ id }) => id === row.id)

    const newRows = isInSelectedRows
      ? selectedRows.filter(({ id }) => id !== row.id)
      : [...selectedRows, row]

    setValue('warehouses', newRows)
    setSelectedRows(newRows)
  }

  const labelField = useCallback(
    ({ row }: Parameters<TableRenderCell<WarehousesTableLine>>[0]) => {
      return <DataCell row={row} value={row.label} />
    },

    [warehousesData?.Warehouse],
  )

  const selectRowField = useCallback(
    ({ row }: Parameters<TableRenderCell<WarehousesTableLine>>[0]) => (
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

  const columns: TableColumn<WarehousesTableLine>[] = [
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
      width: '1fr',
    },
  ]

  const handleAllRowSelection = () => {
    const rows = warehousesData?.Warehouse
    if (!rows?.length) return

    if (selectedRows.length === rows.length) {
      setSelectedRows([])
      setValue('warehouses', [])
    } else {
      setSelectedRows(rows)
      setValue('warehouses', 'Все')
    }
  }

  return (
    <Layout className={`${styles.flexedContainer} ${className}`} direction="column">
      <Text className={styles.checkedItems} size="s" view="secondary">
        Всего отмечено {selectedRows.length} из {warehousesData?.Warehouse?.length}
      </Text>
      <CombinedTable
        data={warehousesData?.Warehouse as WarehousesTableLine[]}
        isLoading={isLoading}
        visiblePagCount={5}
        paginationClass={styles.pagination}>
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
                            selectedRows.length === warehousesData?.Warehouse?.length
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
                              accessor={column.accessor || 'label'}
                              items={warehousesData?.Warehouse}
                              {...filterTableProps}
                            />,
                          ]
                        : null
                    }
                    icon={(() =>
                      column.title ? (
                        <SorterIcon isActive={column.accessor === sortColumn} />
                      ) : undefined)()}
                    onClick={() => handleSort((column.accessor as keyof Warehouse) || 'id')}
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
