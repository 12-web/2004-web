import { Asn } from '@store/types/asnApi'
import AddAsn from '../AddAsn/AddAsn'
import EditAsn from '../EditAsn/EditAsn'
import DeleteAsn from '../DeleteAsn/DeleteAsn'
import { ClientFormModal } from '@components/ClientFormModal'
import { ClientTypes } from '@store/types/clientApi'
import modals from '@utils/modals'
import Alert from '@shared/Alert'
import ImportAsn from '../ImportAsn'

type ModalsProps = {
  asn: Asn | null
}

const Modals = ({ asn }: ModalsProps) => {
  return (
    <>
      <AddAsn />
      <EditAsn asn={asn} />
      <DeleteAsn />
      <ClientFormModal
        title="Добавить нового Поставщика"
        modalId={modals.ADD_NEW_SUPPLIER}
        clientType={ClientTypes.supplier}
      />
      <Alert />
      <ImportAsn />
    </>
  )
}

export default Modals
