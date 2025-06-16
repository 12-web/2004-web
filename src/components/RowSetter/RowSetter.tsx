import { useCallback, useMemo, useRef, useState } from 'react'

import { Popover } from '@consta/uikit/Popover'
import { Button } from '@consta/uikit/Button'
import { TextField } from '@consta/uikit/TextField'
import { Layout } from '@consta/uikit/Layout'
import { Text } from '@consta/uikit/Text'
import { CheckboxGroup } from '@consta/uikit/CheckboxGroup'

import { IconFunnel } from '@consta/icons/IconFunnel'
import { IconSearchStroked } from '@consta/icons/IconSearchStroked'

import { FilterItem } from './types'
import { ChildrenFilterProps } from '@components/Table/FilteredTable/types'

import styles from './styles.module.css'

type RowSetterProps<DATA> = {
  checkboxes: FilterItem<DATA>[]
  isOpen: boolean
  accessor: keyof DATA
} & Omit<ChildrenFilterProps<DATA>, 'filteredData'>

const RowSetter = <DATA,>({
  checkboxes,
  accessor,
  setOpenedFilter,
  popoverFilters,
  popoverSearch,
  setPopoverFilters,
  setPopoverSearch,
  handleFilter,
  isOpen,
}: RowSetterProps<DATA>) => {
  const ref = useRef(null)

  const uniqueFilters = useMemo(() => {
    return popoverFilters.filter(item => item.name === accessor)
  }, [popoverFilters])

  const uniqueItems = useMemo(() => {
    const uniqueValues = new Set(checkboxes.map(item => JSON.stringify(item)))
    return Array(...uniqueValues).map(item => JSON.parse(item))
  }, [checkboxes])

  const defaultItems: FilterItem<DATA>[] | null = useMemo(() => {
    return uniqueItems.filter(item => uniqueFilters.some(filter => filter.value === item.value))
  }, [uniqueFilters])

  const searchItem = popoverSearch.find(item => item.name === accessor)?.value || null

  const [search, setSearch] = useState<string | null>(searchItem)

  const searchItems = useMemo(
    () =>
      uniqueItems.filter(item =>
        search ? item.name.toLowerCase().includes(search?.toLowerCase()) : true,
      ),
    [search, uniqueItems],
  )

  const [checkedItems, setCheckedItems] = useState<FilterItem<DATA>[] | null>(defaultItems)

  const close = useCallback((e?: MouseEvent) => {
    const isAnotherPopover = (e?.target as HTMLElement).closest('button')

    setOpenedFilter(isAnotherPopover ? (accessor as string) : null)
  }, [])

  const open = useCallback(() => {
    const savedSearchFields = popoverSearch.filter(filter => filter.name !== accessor)
    setOpenedFilter(isOpen ? null : (accessor as string))

    isOpen && setPopoverSearch(savedSearchFields)
  }, [isOpen])

  const handleApplyClick = useCallback(
    (values: FilterItem<DATA>[] | null) => {
      const newFilters = values?.map(item => ({ name: accessor, value: item.value })) || []
      const savedValues = popoverFilters.filter(filter => filter.name !== accessor)
      const savedSearchFields = popoverSearch.filter(filter => filter.name !== accessor)

      setPopoverFilters([...savedValues, ...newFilters])
      setPopoverSearch([...savedSearchFields, { name: accessor, value: search || '' }])
      const newValues = values?.map(item => item.value) || []
      handleFilter(accessor, newValues)
    },
    [popoverFilters, popoverSearch, accessor, searchItems],
  )

  const handleResetClick = useCallback(() => {
    const savedValues = popoverFilters.filter(filter => filter.name !== accessor)
    const savedSearchFields = popoverSearch.filter(filter => filter.name !== accessor)

    setPopoverFilters(savedValues)

    setPopoverSearch(savedSearchFields)
    handleFilter(accessor, [])
  }, [popoverFilters, popoverSearch, accessor, searchItems])

  const content = searchItems.length ? (
    <CheckboxGroup
      items={searchItems}
      value={checkedItems}
      onChange={setCheckedItems}
      getItemLabel={item => item.name as string}
      size="xs"
    />
  ) : (
    <Text size="s" className={styles.text}>
      Результаты не найдены
    </Text>
  )

  return (
    <>
      <Button
        title="Установить фильтр"
        size="s"
        view="clear"
        iconLeft={IconFunnel}
        onlyIcon
        onClick={e => {
          e.stopPropagation()
          open()
        }}
        ref={ref}
        className={checkedItems?.length ? styles.checked : ''}
      />
      {isOpen && (
        <Popover
          className={styles.columnsPopover}
          anchorRef={ref}
          isInteractive={true}
          direction="upCenter"
          spareDirection="downRight"
          offset="xs"
          arrowOffset={0}
          placeholder={undefined}
          onPointerLeaveCapture={undefined}
          onPointerEnterCapture={undefined}
          onClick={e => e.stopPropagation()}
          onClickOutside={e => close(e)}>
          <TextField
            className={styles.search}
            placeholder="Искать по значению"
            rightSide={IconSearchStroked}
            value={search}
            type="text"
            size="s"
            onChange={setSearch}
          />
          <Layout direction="column" className={styles.checkboxes}>
            {content}
          </Layout>
          <Layout className={styles.handles}>
            <Button
              label="Сбросить выделенные"
              size="xs"
              view="secondary"
              onClick={handleResetClick}
            />
            <Button label="Применить" size="xs" onClick={() => handleApplyClick(checkedItems)} />
          </Layout>
        </Popover>
      )}
    </>
  )
}

export default RowSetter
