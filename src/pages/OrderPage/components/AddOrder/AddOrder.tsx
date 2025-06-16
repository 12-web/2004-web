import Modal from '@shared/Modal'
import Form from './Form/Form'

import modals from '@utils/modals'

const AddOrder = () => {
  return (
    <Modal modalId={modals.ADD_ORDER_MODAL_ID} title="Новый заказ (статус - Редактируется)">
      <Form />
    </Modal>
  )
}

export default AddOrder
