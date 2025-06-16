import { orderApi } from '@store/services/orderApi'
import ConfirmModal from '@shared/ConfirmModal'
import { useAppDispatch, useAppSelector } from '@hooks/redux'
import modals from '@utils/modals'
import { closed } from '@store/reducers/Modal/ModalOpenSlice'
import { useToast } from '@hooks/useToast'
import { requestMessage } from '@utils/userMessages/RequestMessages'

const DeleteOrder = () => {
  const modalState = useAppSelector(state => state.modalState)
  const isOpen = !!modalState.openedIds.find(id => id === modals.DELETE_ORDER_MODAL_ID)

  const { order } = useAppSelector(state => state.orderDataState)

  const dispatch = useAppDispatch()
  const close = () => dispatch(closed())

  const { showToast } = useToast()

  const [deleteOrder, { isLoading: isRemoveLoading }] = orderApi.useDeleteOrderMutation()

  const handleConfirmDelete = async () => {
    if (!order) return

    try {
      const { Error } = await deleteOrder({ OrderId: order.orderId }).unwrap()

      Error ? showToast(Error) : close()
    } catch (err) {
      showToast(requestMessage.errorRequest)
    }
  }

  return (
    <ConfirmModal
      confirmBtnLabel="Удалить"
      closeModal={close}
      onClick={handleConfirmDelete}
      title="Удаление заказа"
      text={`Вы действительно хотите удалить заказ ${order?.no}?`}
      isOpen={isOpen}
      isLoading={isRemoveLoading}
    />
  )
}

export default DeleteOrder
