import { useFormContext } from 'react-hook-form'
import { useCallback, useEffect, useState } from 'react'
import { goodApi } from '@store/services/goodApi'
import { Button } from '@consta/uikit/Button'
import { IconAdd } from '@consta/icons/IconAdd'
import Combobox from '@components/ReactHookForm/ComboBox'
import { Table, TableColumn, TableRenderCell, TableRenderHeaderCell } from '@consta/table/Table'
import TextField from '@components/ReactHookForm/TextField'
import DatePicker from '@components/ReactHookForm/DatePicker'
import { IconTrash } from '@consta/icons/IconTrash'
import { message } from '@utils/userMessages/FormMessages'
import { Checkbox } from '@consta/uikit/Checkbox'
import { orderLineApi } from '@store/services/orderLineApi'
import ReplaceWithViewTextField from '../../../../shared/Form/ReplaceWithViewTextField'
import { formatDateFromISO, formatStingToDate } from '@utils/dates'
import { Layout } from '@consta/uikit/Layout'
import { Text } from '@consta/uikit/Text'
import { useLotsDropDown } from '@hooks/useLotsDropDown'
import { useMUDropDown } from '@hooks/useMUDropDown'
import SortedTable from '@components/Table/SortedTable'
import SorterIcon from '@components/SorterIcon/SorterIcon'
import { OrderLineTableRow } from 'types/order/order'
import { OrderLine } from '@store/types/orderLineApi'
import { useAppDispatch, useAppSelector } from '@hooks/redux'
import modals from '@utils/modals'
import HeaderCell from '@shared/HeaderCell'
import { opened } from '@store/reducers/Alert/AlertSlice'
import { measurementUnitApi } from '@store/services/measurementUnitApi'

import styles from '@styles/modalForm.module.css'

export type OrderLineTableProps = {
  orderId?: number
  isEditMode: boolean
  onCancelEditMode?: VoidFunction
  isLoading: boolean
}

const OrderLineTable = ({
  isEditMode,
  orderId,
  onCancelEditMode,
  isLoading,
}: OrderLineTableProps) => {
  const [rows, setRows] = useState<OrderLineTableRow[]>([])
  const [selectedRows, setSelectedRows] = useState<OrderLineTableRow[]>([])

  const { register, setValue, unregister, resetField, watch } = useFormContext()

  const [getOrderLines] = orderLineApi.useLazyGetOrderLinesQuery()

  const [getMeasurementUnits] = measurementUnitApi.useLazyGetMeasurementUnitsQuery()

  const { data: goods } = goodApi.useGetGoodsQuery()

  const modalState = useAppSelector(state => state.modalState)
  const isOpen = !!modalState.openedIds.find(id => id === modals.EDIT_ORDER_MODAL_ID)

  const dispatch = useAppDispatch()

  const setOrderLines = useCallback(
    (orderLines: OrderLine[]) => {
      unregister('orderLines')
      orderLines.forEach(line => {
        const { id } = line

        setValue(`orderLines[${id}].bbd`, formatStingToDate(line.bbd))
        setValue(`orderLines[${id}].prd`, formatStingToDate(line.prd))
        setValue(`orderLines[${id}].count`, line.count)
        setValue(`orderLines[${id}].good`, line.good)
        setValue(`orderLines[${id}].goodArticle`, line.good.article)
        setValue(`orderLines[${id}].measurementUnit`, line.measurementUnit)
        setValue(`orderLines[${id}].lot`, line.lot)
      })
    },
    [isOpen],
  )

  const getLines = useCallback(async () => {
    if (!orderId) return

    try {
      const { OrderLine, Error } = await getOrderLines({ OrderId: orderId }).unwrap()

      Error && dispatch(opened({ message: Error }))

      if (OrderLine) {
        setRows(OrderLine)
        setOrderLines(OrderLine)
      }
    } catch (err) {}
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    getLines()
  }, [isOpen])

  const addLine = () => setRows([...rows, { id: Date.now(), status: 'new' }])

  const removeLine = (rowId: number) => {
    setRows(oldRows => oldRows.filter(({ id }) => id !== rowId))
    unregister(`orderLines[${rowId}]`)
  }

  const setFilteredRowData = (rowId: string, newData: { [key: string]: string | undefined }) => {
    setRows(rows => rows.map(row => (row.id === rowId ? { ...row, ...newData } : row)))
  }

  const goodField = useCallback(
    (props: Parameters<TableRenderCell<OrderLineTableRow>>[0]) => (
      <ReplaceWithViewTextField
        isReplacing={!isEditMode}
        path={`orderLines[${props.row.id}].good.label`}
        rootClassName={styles.lineCell}>
        <Combobox
          items={goods?.Goods || []}
          registered={register(`orderLines[${props.row.id}].good`, { required: message.required })}
          required
          placeholder="Выберите"
          size="s"
          virtualScroll
          disabled={isLoading}
          onChange={async value => {
            setValue(`orderLines[${props.row.id}].goodArticle`, value?.article)
            setFilteredRowData(props.row.id, {
              goodLabel: value?.label,
              goodArticle: value?.article,
            })
            resetField(`orderLines[${props.row.id}].measurementUnit`)
            resetField(`orderLines[${props.row.id}].lot`)

            if (value?.id !== undefined) {
              const { data: newMU } = await getMeasurementUnits({
                GoodItemId: value?.id,
              })

              if (newMU?.MU) {
                setValue(`orderLines[${props.row.id}].measurementUnit`, newMU?.MU[0])
                setFilteredRowData(props.row.id, { MU: newMU?.MU[0].label })
              }
            }
          }}
        />
      </ReplaceWithViewTextField>
    ),
    [goods, isEditMode, isLoading],
  )

  const articleField = useCallback(
    (props: Parameters<TableRenderCell<OrderLineTableRow>>[0]) => (
      <TextField
        registered={register(`orderLines[${props.row.id}].goodArticle`)}
        readOnly
        required={isEditMode}
        className={styles.lineCell}
        size="s"
        type="textarea"
        disabled={isLoading}
      />
    ),
    [isEditMode, isLoading],
  )

  const muField = useCallback(
    (props: Parameters<TableRenderCell<OrderLineTableRow>>[0]) => {
      const value = watch(`orderLines[${props.row.id}].good`)
      const [items, isMULoading, isDisabled, onDropDown] = useMUDropDown(value)

      return (
        <ReplaceWithViewTextField
          isReplacing={!isEditMode}
          path={`orderLines[${props.row.id}].measurementUnit.label`}
          rootClassName={styles.lineCell}>
          <Combobox
            registered={register(`orderLines[${props.row.id}].measurementUnit`, {
              required: message.required,
            })}
            required
            placeholder="Выберите"
            size="s"
            onChange={value => setFilteredRowData(props.row.id, { MU: value?.label })}
            virtualScroll
            isLoading={isMULoading}
            items={items}
            disabled={isDisabled || isLoading}
            onDropdownOpen={onDropDown}
          />
        </ReplaceWithViewTextField>
      )
    },
    [isEditMode, isLoading],
  )

  const countField = useCallback(
    (props: Parameters<TableRenderCell<OrderLineTableRow>>[0]) => (
      <TextField
        registered={register(`orderLines[${props.row.id}].count`, {
          required: message.required,
          onChange: e => setFilteredRowData(props.row.id, { count: e.target.value }),
        })}
        readOnly={!isEditMode}
        required={isEditMode}
        size="s"
        className={styles.lineCell}
        type="textarea"
        disabled={isLoading}
      />
    ),
    [isEditMode, isLoading],
  )

  const bbdField = useCallback(
    (props: Parameters<TableRenderCell<OrderLineTableRow>>[0]) => (
      <ReplaceWithViewTextField
        isReplacing={!isEditMode}
        path={`orderLines[${props.row.id}].bbd`}
        rootClassName={styles.lineCell}
        valueModifier={formatDateFromISO}>
        <DatePicker
          registered={register(`orderLines[${props.row.id}].bbd`, {
            required: message.required,
          })}
          required={isEditMode}
          size="s"
          format="dd/MM/yyyy"
          placeholder="дд/мм/гггг"
          disabled={isLoading}
          onChange={row => setFilteredRowData(props.row.id, { bbd: row?.toString() })}
        />
      </ReplaceWithViewTextField>
    ),
    [isEditMode, isLoading],
  )

  const prdField = useCallback(
    (props: Parameters<TableRenderCell<OrderLineTableRow>>[0]) => (
      <ReplaceWithViewTextField
        isReplacing={!isEditMode}
        path={`orderLines[${props.row.id}].prd`}
        rootClassName={styles.lineCell}
        valueModifier={formatDateFromISO}>
        <DatePicker
          registered={register(`orderLines[${props.row.id}].prd`, {
            required: message.required,
          })}
          required
          size="s"
          format="dd/MM/yyyy"
          placeholder="дд/мм/гггг"
          disabled={isLoading}
          onChange={row => setFilteredRowData(props.row.id, { prd: row?.toString() })}
        />
      </ReplaceWithViewTextField>
    ),
    [isEditMode, isLoading],
  )

  const lotField = useCallback(
    (props: Parameters<TableRenderCell<OrderLineTableRow>>[0]) => {
      const value = watch(`orderLines[${props.row.id}].good`)
      const [lots, isLotsLoading, isDisabled, onLotsDropDown] = useLotsDropDown(value)

      return (
        <ReplaceWithViewTextField
          isReplacing={!isEditMode}
          path={`orderLines[${props.row.id}].lot.label`}
          rootClassName={styles.lineCell}>
          <Combobox
            registered={register(`orderLines[${props.row.id}].lot`, {
              required: message.required,
            })}
            required
            placeholder="Выберите"
            size="s"
            onChange={row => setFilteredRowData(props.row.id, { lotNo: row?.label })}
            virtualScroll
            isLoading={isLotsLoading}
            items={lots}
            disabled={isDisabled || isLoading}
            onDropdownOpen={onLotsDropDown}
          />
        </ReplaceWithViewTextField>
      )
    },
    [isEditMode, isLoading],
  )

  const actionsField = useCallback(
    (props: Parameters<TableRenderCell<OrderLineTableRow>>[0]) => (
      <div className={styles.lineCell}>
        <Button
          size="s"
          view="clear"
          onClick={() => {
            removeLine(props.row.id)
            setSelectedRows(selectedRows.filter(({ id }) => id !== props.row.id))
          }}
          iconLeft={IconTrash}
          onlyIcon
          disabled={!isEditMode || isLoading}
        />
      </div>
    ),
    [removeLine, isEditMode, isLoading],
  )

  const selectRowField = useCallback(
    (props: Parameters<TableRenderCell<OrderLineTableRow>>[0]) => (
      <div className={styles.lineCell}>
        <Checkbox
          size="s"
          checked={!!selectedRows.find(selectedRow => props.row.id === selectedRow.id)}
          view="primary"
          onChange={() => handleRowSelection(props.row)}
          disabled={!isEditMode || isLoading}
        />
      </div>
    ),
    [selectedRows, isEditMode, isLoading],
  )

  const columns: TableColumn<OrderLineTableRow>[] = [
    {
      title: '',
      accessor: 'select',
      renderCell: selectRowField,
      maxWidth: 40,
      renderHeaderCell: HeaderCell,
    },
    {
      title: 'Наименование',
      accessor: 'goodLabel',
      renderCell: goodField,
      width: 'auto',
      renderHeaderCell: HeaderCell,
    },
    {
      title: 'Артикул',
      accessor: 'goodArticle',
      renderCell: articleField,
      maxWidth: 120,
      renderHeaderCell: HeaderCell,
    },
    {
      title: 'Кол-во',
      accessor: 'count',
      renderCell: countField,
      maxWidth: 120,
      renderHeaderCell: HeaderCell,
    },
    {
      title: 'ЕИ',
      accessor: 'MU',
      renderCell: muField,
      maxWidth: 120,
      renderHeaderCell: HeaderCell,
    },
    {
      title: 'Партия',
      accessor: 'lotNo',
      renderCell: lotField,
      maxWidth: 150,
      renderHeaderCell: HeaderCell,
    },
    {
      title: 'BBD',
      accessor: 'bbd',
      renderCell: bbdField,
      maxWidth: 120,
      renderHeaderCell: HeaderCell,
    },
    {
      title: 'PRD',
      accessor: 'prd',
      renderCell: prdField,
      maxWidth: 120,
      renderHeaderCell: HeaderCell,
    },
    {
      title: '',
      accessor: 'actions',
      maxWidth: 40,
      renderCell: actionsField,
      renderHeaderCell: HeaderCell,
    },
  ]

  const handleRowSelection = (row: OrderLineTableRow) => {
    const isInSelectedRows = selectedRows.find(({ id }) => id === row.id)
    if (isInSelectedRows) {
      setSelectedRows(selectedRows.filter(({ id }) => id !== row.id))
    } else {
      setSelectedRows([...selectedRows, row])
    }
  }
  const handleRowDeletion = () => {
    selectedRows.forEach(row => {
      removeLine(row.id)
    })
    setSelectedRows([])
  }

  const handleCancelEdit = () => {
    onCancelEditMode?.()
    getLines()
  }

  const handleAllRowSelection = () => {
    if (selectedRows.length === rows.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(rows)
    }
  }

  return (
    <Layout direction="column" className={styles.tableWrapper}>
      {isEditMode && (
        <Layout className={styles.handles}>
          <Button
            onClick={addLine}
            size="s"
            label="Новая строка"
            view="secondary"
            iconLeft={IconAdd}
            disabled={!isEditMode || isLoading}
          />
          {onCancelEditMode && (
            <Button
              onClick={handleCancelEdit}
              disabled={!isEditMode || isLoading}
              label="Отменить изменения"
              type="button"
              size="s"
              view="secondary"
            />
          )}
          <Button
            size="s"
            label="Удалить выбранные"
            view="secondary"
            disabled={!isEditMode || !selectedRows.length || isLoading}
            onClick={handleRowDeletion}
          />
        </Layout>
      )}
      <SortedTable data={rows as OrderLineTableRow[]}>
        {({ sortedData, handleSort, sortColumn }) => (
          <Table
            className={styles.orderLineTable}
            rows={sortedData}
            headerZIndex={0}
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
                            selectedRows.length === sortedData.length
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
                    isActive={column.accessor === sortColumn}
                    icon={(() =>
                      column.title ? (
                        <SorterIcon isActive={sortColumn === column.accessor} />
                      ) : undefined)()}
                    onClick={() => handleSort(column.accessor || 'good')}
                    {...props}
                  />
                )
              },
            }))}
          />
        )}
      </SortedTable>
      {rows.length === 0 && (
        <Text className={styles.emptyTableText} align="center" size="s">
          Нажмите “+ Новая строка” для добавления груза
        </Text>
      )}
    </Layout>
  )
}

export default OrderLineTable
