import ConfirmModal from '@shared/ConfirmModal'
import { useAppDispatch, useAppSelector } from '@hooks/redux'
import modals from '@utils/modals'
import { closed } from '@store/reducers/Modal/ModalOpenSlice'
import { asnApi } from '@store/services/asnApi'
import { useToast } from '@hooks/useToast'

const DeleteAsn = () => {
  const modalState = useAppSelector(state => state.modalState)
  const isOpen = !!modalState.openedIds.find(id => id === modals.DELETE_ASN_MODAL_ID)

  const { asn } = useAppSelector(state => state.asnDataState)

  const dispatch = useAppDispatch()
  const close = () => dispatch(closed())

  const { showToast } = useToast()

  const [deleteAsn, { isLoading: isRemoveLoading }] = asnApi.useDeleteAsnMutation()

  const handleConfirmDelete = async () => {
    if (!asn) return

    try {
      const { Error } = await deleteAsn({ AsnId: asn.asnId }).unwrap()

      Error ? showToast(Error) : close()
    } catch (err) {}
  }

  return (
    <ConfirmModal
      confirmBtnLabel="Удалить"
      closeModal={close}
      onClick={handleConfirmDelete}
      title="Удаление заказа"
      text={`Вы действительно хотите удалить ASN ${asn?.no}?`}
      isOpen={isOpen}
      isLoading={isRemoveLoading}
    />
  )
}

export default DeleteAsn
