import { default as ModalUI } from '@shared/Modal'
import AddressForm from '../Form/Form'
import modals from '@utils/modals'

import styles from './styles.module.css'

const Modal = ({}) => {
  return (
    <ModalUI
      modalId={modals.ADD_NEW_CLIENT_ADDRESS}
      title="Добавить новый адрес клиента"
      className={styles.clientModal}>
      <AddressForm />
    </ModalUI>
  )
}

export default Modal
