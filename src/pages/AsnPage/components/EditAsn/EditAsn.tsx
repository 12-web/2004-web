import Modal from '@shared/Modal'
import Form from './Form/Form'
import { Asn } from '@store/types/asnApi'
import modals from '@utils/modals'

type EditAsnProps = {
  asn: Asn | null
}

const EditAsn = ({ asn }: EditAsnProps) => {
  return (
    <Modal
      modalId={modals.EDIT_ASN_MODAL_ID}
      title={`ASN №${asn?.no} (Статус прихода - ${asn?.incomingState})`}>
      {asn && <Form asnId={asn.asnId} />}
    </Modal>
  )
}

export default EditAsn
