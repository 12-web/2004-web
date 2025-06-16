import UploadFileModal from '@components/UploadFileModal'
import { toBase64 } from '@utils/toBase64'
import { useToast } from '@hooks/useToast'
import { asnApi } from '@store/services/asnApi'
import modals from '@utils/modals'

const ImportAsn = () => {
  const [uploadFile, { isLoading }] = asnApi.useUploadAsnMutation()

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
      modalId={modals.IMPORT_ASN}
      onUpload={handleUploadClick}
      title="Загрузить ASN файлом"
      isLoading={isLoading}
    />
  )
}

export default ImportAsn
