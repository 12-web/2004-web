import Form from './Form/Form'
import Modal from '@shared/Modal'
import modals from '@utils/modals'
import { Order } from '@store/types/orderApi'

type EditOrderProps = {
  order: Order | null
}

const EditOrder = ({ order }: EditOrderProps) => {
  return (
    <Modal
      modalId={modals.EDIT_ORDER_MODAL_ID}
      title={`Заказ №${order?.no} (Статус - ${order?.status})`}>
      {order && <Form orderId={order.orderId} />}
    </Modal>
  )
}

export default EditOrder
