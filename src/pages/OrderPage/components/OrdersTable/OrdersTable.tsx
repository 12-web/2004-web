import { ReactNode, useCallback, useMemo, useState } from 'react'
import { Table, TableColumn, TableRenderCell, TableRenderHeaderCell } from '@consta/table/Table'
import { DataCell } from '@consta/table/DataCell'
import IncomingState from '../IncomingState/IncomingState'
import { formatDateFromISO, formatDateISO } from '@utils/dates'
import { Text } from '@consta/uikit/Text'
import { Button } from '@consta/uikit/Button'
import { IconTrash } from '@consta/icons/IconTrash'
import { useAppDispatch, useAppSelector } from '@hooks/redux'
import { opened } from '@store/reducers/Modal/ModalOpenSlice'
import modals from '@utils/modals'
import { setOrder } from '@store/reducers/Order/OrderDataSlice'
import { columnsName } from './columns'
import OrderRowSetter from '../RowSetter/RowSetter'
import SorterIcon from '@components/SorterIcon/SorterIcon'
import { Order } from '@store/types/orderApi'
import { OrderLineTableRow } from 'types/order/order'
import HeaderCell from '@shared/HeaderCell'
import CombinedTable from '@components/Table/CombinedTable'
import { setOrderRows } from '@store/reducers/OrderTable/OrderTableSlice'
import { Layout } from '@consta/uikit/Layout'
import { useDateFilter } from '@hooks/useDateFilter'
import { useToast } from '@hooks/useToast'
import { orderApi } from '@store/services/orderApi'
import OrdersTableHandles from '../OrdersTableHandles'

import styles from './styles.module.css'

export type OrderRow = Order & {
  removal?: ReactNode
  isRequired?: boolean
}

type OrdersTableProps = {
  onEditOrder: (row: OrderRow) => void
}

const OrdersTable = ({ onEditOrder }: OrdersTableProps) => {
  const filtersData = useDateFilter()

  const [search, setSearch] = useState<string | null>(null)

  const dispatch = useAppDispatch()

  const { showToast } = useToast()

  const { data, isLoading } = orderApi.useGetOrdersQuery({
    DateTo: formatDateISO(filtersData.endDate) || '',
    DateFrom: formatDateISO(filtersData.startDate) || '',
  })

  const searchedData: OrderRow[] = useMemo(() => {
    return (
      data?.Order?.filter(order =>
        order.no.toLowerCase().startsWith(search?.toLowerCase() || ''),
      ) || []
    )
  }, [search, data])

  const { columns } = useAppSelector(state => state.orderTableState)

  const handleDeleteClick = (order: OrderRow) => {
    dispatch(setOrder({ order }))
    dispatch(opened(modals.DELETE_ORDER_MODAL_ID))
  }

  const noField = useCallback(
    ({ row }: Parameters<TableRenderCell<OrderLineTableRow>>[0]) => (
      <DataCell
        style={{ cursor: 'pointer' }}
        className={styles.cell}
        onClick={() => onEditOrder(row)}>
        <Text size="s" view="brand">
          {row.no ? row.no : '-'}
        </Text>
      </DataCell>
    ),
    [],
  )

  const creationDateField = useCallback(
    ({ row }: Parameters<TableRenderCell<OrderLineTableRow>>[0]) => (
      <DataCell className={styles.cell}>
        <Text size="s">{formatDateFromISO(row.creationDate)}</Text>
      </DataCell>
    ),
    [],
  )

  const statusField = useCallback(
    ({ row }: Parameters<TableRenderCell<OrderLineTableRow>>[0]) => (
      <DataCell className={styles.cell}>
        <IncomingState status={row.status ? row.status : '-'} />
      </DataCell>
    ),
    [],
  )

  const clientCodeField = useCallback(
    ({ row }: Parameters<TableRenderCell<OrderLineTableRow>>[0]) => (
      <DataCell className={styles.cell}>
        <Text size="s">{row.clientCode ? row.clientCode : '-'}</Text>
      </DataCell>
    ),
    [],
  )

  const amNumberField = useCallback(
    ({ row }: Parameters<TableRenderCell<OrderLineTableRow>>[0]) => (
      <DataCell className={styles.cell}>
        <Text size="s">{row.amNumber ? row.amNumber : '-'}</Text>
      </DataCell>
    ),
    [],
  )

  const clientLabelField = useCallback(
    ({ row }: Parameters<TableRenderCell<OrderLineTableRow>>[0]) => (
      <DataCell className={styles.cell}>
        <Text size="s">{row.clientLabel ? row.clientLabel : '-'}</Text>
      </DataCell>
    ),
    [],
  )

  const driverField = useCallback(
    ({ row }: Parameters<TableRenderCell<OrderLineTableRow>>[0]) => (
      <DataCell className={styles.cell}>
        <Text size="s">{row.driver ? row.driver : '-'}</Text>
      </DataCell>
    ),
    [],
  )

  const removalField = useCallback(
    ({ row }: Parameters<TableRenderCell<OrderLineTableRow>>[0]) => (
      <DataCell className={styles.cellButton}>
        <Button
          size="s"
          view="clear"
          iconRight={IconTrash}
          onlyIcon
          onClick={() => handleDeleteClick(row)}
          disabled={!row.removal}
          title="Удалить"
        />
      </DataCell>
    ),
    [],
  )

  const tableColumns = useMemo(() => {
    const defaultColumns: TableColumn<OrderRow>[] = [
      {
        ...columnsName['no'],
        width: '1fr',
        minWidth: 180,
        renderCell: noField,
      },
      {
        ...columnsName['creationDate'],
        width: '1fr',
        minWidth: 180,
        renderCell: creationDateField,
      },
      {
        ...columnsName['status'],
        width: '1fr',
        minWidth: 180,
        renderCell: statusField,
      },
      {
        ...columnsName['clientCode'],
        width: '1fr',
        minWidth: 180,
        renderCell: clientCodeField,
      },
      {
        ...columnsName['clientLabel'],
        width: '1fr',
        minWidth: 180,
        renderCell: clientLabelField,
      },
      {
        ...columnsName['amNumber'],
        width: '1fr',
        minWidth: 180,
        renderCell: amNumberField,
      },
      {
        ...columnsName['driver'],
        width: '1fr',
        minWidth: 180,
        renderCell: driverField,
      },
      {
        ...columnsName['removal'],
        maxWidth: 40,
        renderCell: removalField,
        renderHeaderCell: HeaderCell,
      },
    ]

    return defaultColumns.filter(
      ({ accessor }) =>
        columns?.some(col => col.accessor === accessor) || columnsName[accessor || ''].isRequired,
    )
  }, [columns])

  const handleSetTableRows = useCallback((data: OrderRow[]) => {
    dispatch(setOrderRows(data))
  }, [])

  return (
    <CombinedTable
      onSetRows={handleSetTableRows}
      data={searchedData}
      isLoading={isLoading}
      paginationClass={styles.pagination}>
      {({ paginatedData, sortColumn, handleSort, ...filterTableProps }) => (
        <>
          <OrdersTableHandles
            {...filtersData}
            setSearch={setSearch}
            search={search}
            onResetFilters={filterTableProps.resetFilters}
          />
          <Layout direction="column">
            <Table
              className={styles.table}
              stickyHeader
              rows={paginatedData}
              headerZIndex={1}
              getRowKey={row => row.orderId}
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
                            <OrderRowSetter
                              accessor={column.accessor || Object.values(columnsName)[0].accessor}
                              orders={searchedData}
                              {...filterTableProps}
                            />,
                          ]
                        : null
                    }
                    icon={(() =>
                      column.title ? (
                        <SorterIcon isActive={column.accessor === sortColumn} />
                      ) : undefined)()}
                    onClick={() => handleSort(column.accessor || 'orderId')}
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

export default OrdersTable
