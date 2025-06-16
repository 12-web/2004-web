import { orderApi } from '@store/services/orderApi'
import UploadFileModal from '@components/UploadFileModal'
import { toBase64 } from '@utils/toBase64'
import { useToast } from '@hooks/useToast'
import modals from '@utils/modals'

const ImportOrders = () => {
  const [uploadFile, { isLoading }] = orderApi.useUploadOrderMutation()

  const { showToast } = useToast()

  const handleUploadClick = async (files: File[]) => {
    try {
      const file = files[0]
      const fileToBase64 = await toBase64(file)

      if (typeof fileToBase64 === 'string') {
        const { result, Error } = await uploadFile({
          FileName: file.name,
          FileBase64: fileToBase64,
        }).unwrap()

        if (result != undefined) showToast(result, 'success')
        if (Error) showToast(Error)
      }
    } catch (err) {}
  }

  return (
    <UploadFileModal
      modalId={modals.IMPORT_ORDERS}
      onUpload={handleUploadClick}
      title="Загрузить заказы файлом"
      isLoading={isLoading}
    />
  )
}

export default ImportOrders
