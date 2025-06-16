import { Order } from '@store/types/orderApi'
import modals from '@utils/modals'
import { ClientFormModal } from '@components/ClientFormModal'
import { ClientTypes } from '@store/types/clientApi'
import { AddressFormModal } from '../AddAddress'
import AddOrder from '../AddOrder'
import EditOrder from '../EditOrder'
import DeleteOrder from '../DeleteOrder'
import Alert from '@shared/Alert'
import ImportOrders from '../ImportOrders'

type OrderModalsProps = {
  order: Order | null
}

const Modals = ({ order }: OrderModalsProps) => {
  return (
    <>
      <AddOrder />
      <EditOrder order={order} />
      <DeleteOrder />
      <Alert />
      <AddressFormModal />
      <ClientFormModal
        title="Добавить нового клиента"
        modalId={modals.ADD_NEW_CLIENT}
        clientType={ClientTypes.client}
      />
      <ImportOrders />
    </>
  )
}

export default Modals
