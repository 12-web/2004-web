import { Table, TableRenderHeaderCell } from '@consta/table/Table'
import HeaderCell from '@shared/HeaderCell'
import { goodApi } from '@store/services/goodApi'
import SorterIcon from '@components/SorterIcon/SorterIcon'
import { Good } from '@store/types/goodApi'
import { Loader } from '@consta/uikit/Loader'
import DataCell from '@shared/DataCell'
import CombinedTable from '@components/Table/CombinedTable'
import { columns, columnsName } from './columns'
import CommonRowSetter from '@components/RowSetter/CommonRowSetter'
import { useMemo, useState } from 'react'
import { Layout } from '@consta/uikit/Layout'
import { Button } from '@consta/uikit/Button'
import { TextField } from '@consta/uikit/TextField'
import { IconSearchStroked } from '@consta/icons/IconSearchStroked'

import styles from './styles.module.css'

const GoodsTable = () => {
  const [search, setSearch] = useState<string | null>(null)

  const { data, isLoading } = goodApi.useGetGoodsQuery()

  const searchedData = useMemo(() => {
    return (
      data?.Goods?.filter(good => {
        return (
          good.article.toLowerCase().includes(search?.toLowerCase() || '') ||
          good.label.toLowerCase().includes(search?.toLowerCase() || '')
        )
      }) || []
    )
  }, [search, data])

  if (isLoading) return <Loader className={styles.loader} />

  return (
    <CombinedTable data={searchedData} isLoading={isLoading} paginationClass={styles.pagination}>
      {({ paginatedData, sortColumn, handleSort, ...filterTableProps }) => (
        <>
          <Layout className={styles.toolbar}>
            <Button
              onClick={() => filterTableProps.resetFilters()}
              className="button"
              label="Очистить все фильтры"
              size="s"
              view="secondary"
            />
            <Layout>
              <TextField
                className={styles.search}
                placeholder="Найти товар"
                rightSide={IconSearchStroked}
                value={search}
                type="text"
                size="s"
                onChange={setSearch}
              />
            </Layout>
          </Layout>
          <Layout className={styles.tableContainer} direction="column">
            <Table
              rows={paginatedData}
              className={styles.table}
              headerZIndex={0}
              stickyHeader
              columns={columns.map(column => ({
                ...column,
                renderCell: ({ row }: { row: Good }) => (
                  <DataCell row={row} value={row[column.accessor!]} />
                ),
                renderHeaderCell: ({
                  tableRef,
                  ...props
                }: Parameters<TableRenderHeaderCell>[0]) => (
                  <HeaderCell
                    className={column.accessor === sortColumn ? styles.activeHeaderCell : ''}
                    controlRight={
                      column.title
                        ? [
                            <CommonRowSetter
                              accessor={column.accessor || Object.values(columnsName)[0].accessor}
                              items={searchedData}
                              {...filterTableProps}
                            />,
                          ]
                        : null
                    }
                    icon={(() =>
                      column.title ? (
                        <SorterIcon isActive={column.accessor === sortColumn} />
                      ) : undefined)()}
                    onClick={() => handleSort(column.accessor || 'id')}
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

export default GoodsTable
