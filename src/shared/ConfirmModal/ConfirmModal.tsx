import { Layout } from '@consta/uikit/Layout'
import { Text } from '@consta/uikit/Text'
import { Modal } from '@consta/uikit/Modal'
import { Button } from '@consta/uikit/Button'
import { IconClose } from '@consta/icons/IconClose'
import { useAppSelector } from '@hooks/redux'

import styles from './styles.module.css'

type ConfirmModalProps = {
  title: string
  text?: string
  onClick: VoidFunction
  closeModal: VoidFunction
  isOpen: boolean
  confirmBtnLabel: string
  isLoading?: boolean
}

const ConfirmModal = ({
  isOpen,
  closeModal,
  title,
  text,
  onClick,
  confirmBtnLabel = '',
  isLoading,
}: ConfirmModalProps) => {
  const { items } = useAppSelector(state => state.alertState)
  const isAlertActive = !!items.length

  return (
    <Modal
      className={styles.modal}
      isOpen={isOpen}
      hasOverlay
      onClickOutside={!isAlertActive ? closeModal : undefined}
      onEsc={!isAlertActive ? closeModal : undefined}>
      <Layout className={styles.content} direction="column">
        <Layout className={styles.header}>
          <Text className={styles.title} size="m" weight="bold">
            {title}
          </Text>
          <Button
            label="Закрыть"
            view="clear"
            iconRight={IconClose}
            onlyIcon
            onClick={closeModal}
            size="s"
          />
        </Layout>
        <Text className={styles.text} size="s">
          {text}
        </Text>
        <Layout className={styles.bottom}>
          <Button view="clear" label="Отмена" onClick={closeModal} size="s" disabled={isLoading} />
          <Button label={confirmBtnLabel} onClick={onClick} size="s" loading={isLoading} />
        </Layout>
      </Layout>
    </Modal>
  )
}

export default ConfirmModal
