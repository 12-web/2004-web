import { useAppDispatch, useAppSelector } from '@hooks/redux'
import { Button } from '@consta/uikit/Button'
import modals from '@utils/modals'
import { opened } from '@store/reducers/Modal/ModalOpenSlice'
import { Layout } from '@consta/uikit/Layout'
import DateFilters from '@components/DateFilters/DateFilters'
import { TextField } from '@consta/uikit/TextField'
import { IconSearchStroked } from '@consta/icons/IconSearchStroked'
import { IconAdd } from '@consta/icons/IconAdd'
import OrderColumnsSetter from '../ColumnsSetter/ColumnsSetter'
import { useDateFilter } from '@hooks/useDateFilter'
import BtnsList, { BtnsListProps } from '../../../../components/BtnsList/BtnsList'

import styles from './styles.module.css'

type OrdersTableHandlesProps = {
  onResetFilters: VoidFunction
  setSearch: (search: string | null) => void
  search: string | null
} & ReturnType<typeof useDateFilter>

const OrdersTableHandles = ({
  onResetFilters,
  startDate,
  endDate,
  search,
  setSearch,
  ...dateFilterProps
}: OrdersTableHandlesProps) => {
  const dispatch = useAppDispatch()
  const handleOpenModal = (id: string) => dispatch(opened(id))

  const tableData = useAppSelector(state => state.asnTableState)

  const handleExportClick = (label: string) => {
    console.log(tableData)
  }

  const btns: BtnsListProps['btns'] = [
    {
      label: 'EXCEL',
      handleClick: handleExportClick,
    },
    {
      label: 'PDF',
      handleClick: handleExportClick,
    },
  ]

  return (
    <Layout className={styles.toolbar} direction="column">
      <Layout className={styles.filter_group}>
        <DateFilters startDate={startDate} endDate={endDate} {...dateFilterProps} />
        <Layout>
          <TextField
            className={styles.search}
            placeholder="Найти заказ по номеру"
            rightSide={IconSearchStroked}
            value={search}
            type="text"
            size="s"
            onChange={setSearch}
          />
        </Layout>
      </Layout>
      <Layout className={styles.buttons_group}>
        <Layout className={styles.buttons}>
          <Button
            className="button"
            label="Новый заказ"
            size="s"
            view="secondary"
            iconLeft={IconAdd}
            onClick={() => handleOpenModal(modals.ADD_ORDER_MODAL_ID)}
          />
        </Layout>
        <Layout className={styles.buttons}>
          <Button
            onClick={onResetFilters}
            className="button"
            label="Очистить все фильтры"
            size="s"
            view="secondary"
          />
          <OrderColumnsSetter />
          <Button
            className="button"
            label="Импорт из файла"
            size="s"
            view="secondary"
            onClick={() => handleOpenModal(modals.IMPORT_ORDERS)}
          />
          <BtnsList buttonName="Экспорт таблицы" btns={btns} />
        </Layout>
      </Layout>
    </Layout>
  )
}

export default OrdersTableHandles
