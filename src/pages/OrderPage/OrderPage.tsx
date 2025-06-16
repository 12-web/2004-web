import { useState } from 'react'
import { Layout } from '@consta/uikit/Layout'
import OrdersTable from './components/OrdersTable'
import LayoutContainer from '@components/LayoutContainer'
import { Order } from '@store/types/orderApi'
import { useAppDispatch } from '@hooks/redux'
import { opened } from '@store/reducers/Modal/ModalOpenSlice'
import modals from '@utils/modals'
import OrderModals from './components/Modals/Modals'

import styles from './styles.module.css'

const OrderPage = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const dispatch = useAppDispatch()
  const handleOpenModal = (id: string) => dispatch(opened(id))

  const handleEditClick = (order: Order) => {
    handleOpenModal(modals.EDIT_ORDER_MODAL_ID)
    setSelectedOrder(order)
  }

  return (
    <LayoutContainer>
      <Layout className={styles.container} direction="column">
        <Layout className={styles.main} direction="column">
          <OrdersTable onEditOrder={handleEditClick} />
          <OrderModals order={selectedOrder} />
        </Layout>
      </Layout>
    </LayoutContainer>
  )
}

export default OrderPage
