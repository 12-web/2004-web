import Modal from '@shared/Modal'
import ClientForm, { ClientFormProps } from '../ClientForm/ClientForm'
import { ModalProps } from '@shared/Modal/Modal'

import styles from './styles.module.css'

export type ClientFormModalProps = ClientFormProps & Pick<ModalProps, 'title' | 'modalId'>

const ClientFormModal = ({ modalId, title, ...props }: ClientFormModalProps) => {
  return (
    <Modal modalId={modalId} title={title} className={styles.clientModal}>
      <ClientForm {...props} />
    </Modal>
  )
}

export default ClientFormModal
