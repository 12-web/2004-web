import Modal from '@shared/Modal'
import {
  DragNDropField,
  DragNDropFieldInformerPropStatus,
  getErrorsList,
} from '@consta/uikit/DragNDropFieldCanary'
import { DragNDropFieldInformer } from '@consta/uikit/DragNDropFieldCanary'
import { Text } from '@consta/uikit/Text'
import { Button } from '@consta/uikit/Button'
import { Layout } from '@consta/uikit/Layout'
import { FileRejection } from 'react-dropzone'
import { useState } from 'react'
import { IconClose } from '@consta/icons/IconClose'
import { useAppDispatch } from '@hooks/redux'
import { closed } from '@store/reducers/Modal/ModalOpenSlice'
import { IconAttach } from '@consta/icons/IconAttach'
import styles from './UploadFileModal.module.css'

type UploadFileModalProps = {
  onUpload: (files: File[]) => Promise<void>
  isLoading?: boolean
  title: string
  modalId: string
}

const UploadFileModal = ({ onUpload, isLoading, title, modalId }: UploadFileModalProps) => {
  const [filesDropped, setFilesDropped] = useState<File[]>([])
  const [fileRejections, setFileRejections] = useState<FileRejection[]>([])
  const [otherError, setOtherError] = useState<Error>()

  const handleDrop = (acceptedFiles: File[], rejections: FileRejection[]) => {
    setFilesDropped(acceptedFiles)
    setFileRejections(rejections)
  }

  let status: DragNDropFieldInformerPropStatus = 'default'
  if (otherError) {
    status = 'alert'
  } else {
    status = fileRejections.length > 0 ? 'warning' : 'default'
  }

  let text: string
  switch (status) {
    case 'default':
      text = filesDropped[0]?.name || 'Пока ничего не загружено'
      break
    case 'alert':
      text = 'Что-то пошло не так'
      break
    case 'warning':
      text = getErrorsList(fileRejections).join('; ')
      break
  }

  const dispatch = useAppDispatch()

  const handleCancelClick = () => dispatch(closed())

  const handleUploadFiles = async () => {
    onUpload(filesDropped).then(() => {
      setFilesDropped([])
    })
  }
  return (
    <Modal modalId={modalId} title={title} className={styles.modal}>
      <DragNDropFieldInformer
        status={status}
        loading={isLoading}
        text={text}
        withButton={Boolean(filesDropped.length)}
        buttonLabel="Удалить файлы"
        buttonIcon={IconClose}
        onButtonClick={() => {
          setFilesDropped([])
          setOtherError(undefined)
          setFileRejections([])
        }}
      />
      <DragNDropField
        disabled={Boolean(filesDropped.length)}
        multiple={false}
        className={styles.dropdown}
        onError={setOtherError}
        onDrop={handleDrop}
        accept={{
          'text/csv': ['.csv'],
        }}>
        {({ openFileDialog }) => (
          <Layout direction="column" className={styles.inner}>
            {Boolean(filesDropped.length) ? (
              <Text size="s" className={styles.text}>
                {filesDropped[0].name}
              </Text>
            ) : (
              <>
                <Text size="s" className={styles.text}>
                  Перетащите файл сюда или загрузите по кнопке
                </Text>
                <Text size="s" className={styles.text}>
                  Подходят файлы в формате .csv
                </Text>
                <Button
                  disabled={Boolean(filesDropped.length)}
                  view="ghost"
                  onClick={openFileDialog}
                  label="Выбрать файл"
                  size="s"
                  iconLeft={IconAttach}
                />
              </>
            )}
          </Layout>
        )}
      </DragNDropField>
      <Layout className={styles.handles}>
        <Button
          disabled={isLoading}
          view="clear"
          label="Отмена"
          onClick={handleCancelClick}
          size="s"
        />
        <Button
          disabled={Boolean(!filesDropped.length)}
          loading={isLoading}
          label="Отправить"
          onClick={handleUploadFiles}
          size="s"
        />
      </Layout>
    </Modal>
  )
}

export default UploadFileModal
