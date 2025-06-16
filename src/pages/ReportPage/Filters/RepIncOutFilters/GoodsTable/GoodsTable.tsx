import { useCallback, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import CombinedTable from '@components/Table/CombinedTable'
import { goodApi } from '@store/services/goodApi'
import { Table, TableColumn, TableRenderCell, TableRenderHeaderCell } from '@consta/table/Table'
import HeaderCell from '@shared/HeaderCell'
import SorterIcon from '@components/SorterIcon/SorterIcon'
import { Checkbox } from '@consta/uikit/Checkbox'
import { Good } from '@store/types/goodApi'
import DataCell from '@shared/DataCell'
import { Layout } from '@consta/uikit/Layout'
import { RepIncOutInputs } from 'types/report/report'
import { Text } from '@consta/uikit/Text'
import CommonRowSetter from '@components/RowSetter/CommonRowSetter'

import styles from '../../styles.module.css'

type GoodTableLine = Good & any

type GoodsTableProps = {
  className?: string
}

export const GoodsTable = ({ className }: GoodsTableProps) => {
  const { setValue } = useFormContext<RepIncOutInputs>()

  const [selectedRows, setSelectedRows] = useState<GoodTableLine[]>([])

  const { data: goodsData, isLoading } = goodApi.useGetGoodsQuery()

  const handleRowSelection = (row: GoodTableLine) => {
    const isInSelectedRows = selectedRows.find(({ id }) => id === row.id)

    const newRows = isInSelectedRows
      ? selectedRows.filter(({ id }) => id !== row.id)
      : [...selectedRows, row]

    setValue('goods', newRows)
    setSelectedRows(newRows)
  }

  const goodField = useCallback(
    ({ row }: Parameters<TableRenderCell<GoodTableLine>>[0]) => {
      return <DataCell row={row} value={row.label} />
    },
    [goodsData?.Goods],
  )

  const articleField = useCallback(
    ({ row }: Parameters<TableRenderCell<GoodTableLine>>[0]) => (
      <DataCell row={row} value={row.article} />
    ),
    [],
  )

  const selectRowField = useCallback(
    ({ row }: Parameters<TableRenderCell<GoodTableLine>>[0]) => (
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

  const columns: TableColumn<GoodTableLine>[] = [
    {
      title: '',
      accessor: 'select',
      renderCell: selectRowField,
      maxWidth: 40,
    },
    {
      title: 'Артикул',
      accessor: 'article',
      renderCell: articleField,
      width: '1fr',
    },
    {
      title: 'Наименование',
      accessor: 'label',
      renderCell: goodField,
      width: '2fr',
    },
  ]

  const handleAllRowSelection = () => {
    const rows = goodsData?.Goods

    if (!rows?.length) return

    if (selectedRows.length === rows.length) {
      setSelectedRows([])
      setValue('goods', [])
    } else {
      setSelectedRows(rows)
      setValue('goods', 'Все')
    }
  }

  return (
    <Layout className={`${styles.flexedContainer} ${className}`} direction="column">
      <Text className={styles.checkedItems} size="s" view="secondary">
        Всего отмечено {selectedRows.length} из {goodsData?.Goods?.length}
      </Text>
      <CombinedTable
        data={goodsData?.Goods as GoodTableLine[]}
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
                            selectedRows.length === goodsData?.Goods?.length
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
                              items={goodsData?.Goods}
                              {...filterTableProps}
                            />,
                          ]
                        : null
                    }
                    icon={(() =>
                      column.title ? (
                        <SorterIcon isActive={column.accessor === sortColumn} />
                      ) : undefined)()}
                    onClick={() => handleSort((column.accessor as keyof GoodTableLine) || 'id')}
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
