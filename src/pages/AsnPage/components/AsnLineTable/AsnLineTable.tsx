import { useFormContext } from 'react-hook-form'
import { useCallback, useEffect, useState } from 'react'
import { goodApi } from '@store/services/goodApi'
import { Button } from '@consta/uikit/Button'
import { IconAdd } from '@consta/icons/IconAdd'
import Combobox from '@components/ReactHookForm/ComboBox'
import { asnLineApi } from '@store/services/asnLineApi'
import { Table, TableColumn, TableRenderCell, TableRenderHeaderCell } from '@consta/table/Table'
import TextField from '@components/ReactHookForm/TextField'
import DatePicker from '@components/ReactHookForm/DatePicker'
import { IconTrash } from '@consta/icons/IconTrash'
import { IconCalendar } from '@consta/icons/IconCalendar'
import { message } from '@utils/userMessages/FormMessages'
import { formatDateFromISO, formatStingToDate } from '@utils/dates'
import { Checkbox } from '@consta/uikit/Checkbox'
import ReplaceWithViewTextField from '@shared/Form/ReplaceWithViewTextField'
import { useMUDropDown } from '@hooks/useMUDropDown'
import { Layout } from '@consta/uikit/Layout'
import { Text } from '@consta/uikit/Text'
import SortedTable from '@components/Table/SortedTable'
import SorterIcon from '@components/SorterIcon/SorterIcon'
import { AsnLines } from '@store/types/asnLineApi'
import asnLineStatuses from '@utils/asnLineStatus'
import Select from '@components/ReactHookForm/Select'
import { useAppSelector } from '@hooks/redux'
import modals from '@utils/modals'
import { AsnLineTableRow } from 'types/asn/asn'
import HeaderCell from '@shared/HeaderCell'
import { useToast } from '@hooks/useToast'
import { measurementUnitApi } from '@store/services/measurementUnitApi'

import styles from '@styles/modalForm.module.css'

export type AsnLineTableProps = {
  isEditMode: boolean
  asnId?: number
  isLoading?: boolean
  onCancelEditMode?: VoidFunction
}

const AsnLineTable = ({ isEditMode, asnId, isLoading, onCancelEditMode }: AsnLineTableProps) => {
  const [rows, setRows] = useState<AsnLineTableRow[]>([])
  const [selectedRows, setSelectedRows] = useState<AsnLineTableRow[]>([])

  const modalState = useAppSelector(state => state.modalState)
  const isOpen = !!modalState.openedIds.find(id => id === modals.EDIT_ASN_MODAL_ID)

  const { showToast } = useToast()

  const { register, setValue, unregister, resetField, watch } = useFormContext()

  const [getAsnLines] = asnLineApi.useLazyGetAsnLinesQuery()

  const [getMeasurementUnits] = measurementUnitApi.useLazyGetMeasurementUnitsQuery()

  const { data: goods } = goodApi.useGetGoodsQuery()

  const setAsnLines = useCallback(
    (asnLines: AsnLines) => {
      unregister('orderLines')
      asnLines.forEach(line => {
        const { id } = line

        const status = asnLineStatuses.find(status => status.id === line.stockStatus)

        setValue(`asnLines[${id}].good`, line.good)
        setValue(`asnLines[${id}].goodArticle`, line.goodArticle)
        setValue(`asnLines[${id}].measurementUnit`, line.measurementUnit)
        setValue(`asnLines[${id}].count`, line.count)
        setValue(`asnLines[${id}].stockStatus`, status)
        setValue(`asnLines[${id}].lot`, line.lot)
        setValue(`asnLines[${id}].bbd`, formatStingToDate(line.bbd))
        setValue(`asnLines[${id}].comment`, line.comment)
      })
    },
    [isOpen],
  )

  const getLines = useCallback(async () => {
    if (!asnId) return

    try {
      const { AsnLine, Error } = await getAsnLines({ AsnId: asnId }).unwrap()

      Error && showToast(Error)

      if (AsnLine) {
        setRows(AsnLine)
        setAsnLines(AsnLine)
      }
    } catch (err) {}
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    getLines()
  }, [isOpen])

  const addLine = () => setRows([...rows, { id: Date.now() }])

  const removeLine = (rowId: number) => {
    setRows(oldRows => oldRows.filter(({ id }) => id !== rowId))

    unregister(`asnLines[${rowId}]`)
  }

  const setFilteredRowData = (rowId: number, newData: { [key: string]: string | undefined }) => {
    setRows(rows => rows.map(row => (row.id === rowId ? { ...row, ...newData } : row)))
  }

  const goodField = useCallback(
    (props: Parameters<TableRenderCell<AsnLineTableRow>>[0]) => (
      <ReplaceWithViewTextField
        isReplacing={!isEditMode}
        path={`asnLines[${props.row.id}].good.label`}
        rootClassName={styles.lineCell}>
        <Combobox
          items={goods?.Goods || []}
          registered={register(`asnLines[${props.row.id}].good`, { required: message.required })}
          required
          size="s"
          virtualScroll
          placeholder="Выберите"
          disabled={!isEditMode || isLoading}
          onChange={async value => {
            setValue(`asnLines[${props.row.id}].goodArticle`, value?.article)
            setFilteredRowData(props.row.id, {
              goodLabel: value?.label,
              goodArticle: value?.article,
            })
            resetField(`asnLines[${props.row.id}].measurementUnit`)

            if (value?.id !== undefined) {
              const { data: newMU } = await getMeasurementUnits({
                GoodItemId: value?.id,
              })

              if (newMU?.MU) {
                setValue(`asnLines[${props.row.id}].measurementUnit`, newMU?.MU[0])
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
    (props: Parameters<TableRenderCell<AsnLineTableRow>>[0]) => (
      <TextField
        registered={register(`asnLines[${props.row.id}].goodArticle`)}
        readOnly
        size="s"
        type="textarea"
        className={styles.lineCell}
        disabled={isLoading}
      />
    ),
    [isEditMode, isLoading],
  )
  const muField = useCallback(
    (props: Parameters<TableRenderCell<AsnLineTableRow>>[0]) => {
      const value = watch(`asnLines[${props.row.id}].good`)
      const [items, isMULoading, isDisabled, onDropDown] = useMUDropDown(value)

      return (
        <ReplaceWithViewTextField
          isReplacing={!isEditMode}
          path={`asnLines[${props.row.id}].measurementUnit.label`}
          rootClassName={styles.lineCell}>
          <Combobox
            registered={register(`asnLines[${props.row.id}].measurementUnit`, {
              required: message.required,
            })}
            required
            placeholder="Выберите"
            size="s"
            onChange={value => setFilteredRowData(props.row.id, { MU: value?.label })}
            virtualScroll
            isLoading={isMULoading}
            items={items}
            disabled={!isEditMode || isDisabled || isLoading}
            onDropdownOpen={onDropDown}
          />
        </ReplaceWithViewTextField>
      )
    },
    [isEditMode, isLoading],
  )
  const countField = useCallback(
    (props: Parameters<TableRenderCell<AsnLineTableRow>>[0]) => (
      <TextField
        registered={register(`asnLines[${props.row.id}].count`, {
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

  // const stockStatusField = useCallback(
  //   (props: Parameters<TableRenderCell<AsnLineTableRow>>[0]) => {
  //     return (
  //       <ReplaceWithViewTextField
  //         isReplacing={!isEditMode}
  //         path={`asnLines[${props.row.id}].stockStatus.id`}
  //         rootClassName={styles.lineCell}>
  //         <Select
  //           size="s"
  //           items={asnLineStatuses}
  //           disabled={isLoading}
  //           registered={register(`asnLines[${props.row.id}].stockStatus`, {
  //             required: message.required,
  //           })}
  //           renderValue={({ item }) => <div>{item.id}</div>}
  //         />
  //       </ReplaceWithViewTextField>
  //     )
  //   },
  //   [isEditMode, isLoading],
  // )

  const bbdField = useCallback(
    (props: Parameters<TableRenderCell<AsnLineTableRow>>[0]) => (
      <ReplaceWithViewTextField
        isReplacing={!isEditMode}
        path={`asnLines[${props.row.id}].bbd`}
        rootClassName={styles.lineCell}
        valueModifier={formatDateFromISO}>
        <DatePicker
          registered={register(`asnLines[${props.row.id}].bbd`, { required: message.required })}
          readOnly={!isEditMode}
          required={isEditMode}
          rightSide={IconCalendar}
          size="s"
          format="dd/MM/yyyy"
          placeholder="дд/мм/гггг"
          onChange={row => setFilteredRowData(props.row.id, { bbd: row?.toString() })}
          disabled={isLoading}
        />
      </ReplaceWithViewTextField>
    ),
    [isEditMode, isLoading],
  )
  const lotField = useCallback(
    (props: Parameters<TableRenderCell<AsnLineTableRow>>[0]) => (
      <ReplaceWithViewTextField
        isReplacing={!isEditMode}
        path={`asnLines[${props.row.id}].lot`}
        rootClassName={styles.lineCell}>
        <TextField
          registered={register(`asnLines[${props.row.id}].lot`, {
            setValueAs: (value: string) => value.trim(),
            onChange: e => setFilteredRowData(props.row.id, { lot: e.target.value }),
          })}
          size="s"
          type="textarea"
          disabled={isLoading}
        />
      </ReplaceWithViewTextField>
    ),
    [isEditMode, isLoading],
  )

  const commentField = useCallback(
    (props: Parameters<TableRenderCell<AsnLineTableRow>>[0]) => (
      <TextField
        registered={register(`asnLines[${props.row.id}].comment`, {
          setValueAs: (value: string) => value.trim(),
          onChange: e => setFilteredRowData(props.row.id, { comment: e.target.value }),
        })}
        readOnly={!isEditMode}
        className={styles.lineCell}
        size="s"
        type="textarea"
        disabled={isLoading}
      />
    ),
    [isEditMode, isLoading],
  )
  const actionsField = useCallback(
    (props: Parameters<TableRenderCell<AsnLineTableRow>>[0]) => (
      <div className={styles.lineCell}>
        <Button
          disabled={!isEditMode || isLoading}
          size="s"
          view="clear"
          onClick={() => removeLine(props.row.id)}
          iconLeft={IconTrash}
          onlyIcon
        />
      </div>
    ),
    [removeLine, isEditMode, isLoading],
  )
  const selectRowField = useCallback(
    (props: Parameters<TableRenderCell<AsnLineTableRow>>[0]) => (
      <div className={styles.lineCell}>
        <Checkbox
          disabled={!isEditMode || isLoading}
          size="s"
          checked={!!selectedRows.find(selectedRow => props.row.id === selectedRow.id)}
          view="primary"
          onChange={() => handleRowSelection(props.row)}
        />
      </div>
    ),
    [selectedRows, isEditMode, isLoading],
  )

  const columns: TableColumn<AsnLineTableRow>[] = [
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
      maxWidth: 110,
      renderHeaderCell: HeaderCell,
    },
    {
      title: 'ЕИ',
      accessor: 'MU',
      renderCell: muField,
      maxWidth: 110,
      renderHeaderCell: HeaderCell,
    },
    // {
    //   title: 'Статус',
    //   accessor: 'stockStatus',
    //   renderCell: stockStatusField,
    //   maxWidth: 120,
    //   renderHeaderCell: HeaderCell,
    // },
    {
      title: 'BBD',
      accessor: 'bbd',
      renderCell: bbdField,
      maxWidth: 110,
      renderHeaderCell: HeaderCell,
    },
    {
      title: 'Партия',
      accessor: 'lot',
      renderCell: lotField,
      maxWidth: 110,
      renderHeaderCell: HeaderCell,
    },
    {
      title: 'Коммент.',
      accessor: 'comment',
      renderCell: commentField,
      maxWidth: 110,
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

  const handleRowSelection = (row: AsnLineTableRow) => {
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
    <Layout direction="column" className={styles.innerFormWrapper}>
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
              size="s"
              label="Отменить изменения"
              view="secondary"
              disabled={!isEditMode || isLoading}
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
      <SortedTable data={rows as AsnLineTableRow[]}>
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

export default AsnLineTable
