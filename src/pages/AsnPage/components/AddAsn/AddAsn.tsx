import Modal from '@shared/Modal'
import Form from './Form/Form'
import modals from '@utils/modals'

const AddAsn = () => {
  return (
    <Modal modalId={modals.ADD_ASN_MODAL_ID} title="Новый ASN">
      <Form />
    </Modal>
  )
}

export default AddAsn
