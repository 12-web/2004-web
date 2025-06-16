import { ReactNode, useCallback, useMemo } from 'react'
import { Modal as ModalConsta } from '@consta/uikit/Modal'
import { Layout } from '@consta/uikit/Layout'
import { IconClose } from '@consta/icons/IconClose'
import { Text } from '@consta/uikit/Text'
import { Button } from '@consta/uikit/Button'
import { useAppDispatch, useAppSelector } from '@hooks/redux'
import { closed } from '@store/reducers/Modal/ModalOpenSlice'
import { joinClasses } from '@utils/userMessages/helpers'

import styles from './styles.module.css'

export type ModalProps = {
  modalId: string
  children: ReactNode
  title: string
  className?: string
}

const Modal = ({ modalId, children, title, className }: ModalProps) => {
  const modalState = useAppSelector(state => state.modalState)
  const { items } = useAppSelector(state => state.alertState)
  const isAlertActive = !!items.length

  const isOpen = useMemo(() => {
    return !!modalState.openedIds.find(id => id === modalId)
  }, [modalState, modalId])

  const modalsLength = modalState.openedIds.length

  const isLast = modalState.openedIds[modalsLength - 1] === modalId

  const dispatch = useAppDispatch()

  const handleCloseModal = useCallback(() => dispatch(closed()), [])

  return (
    <>
      <ModalConsta
        isOpen={isOpen}
        hasOverlay
        onClickOutside={!isAlertActive && isLast ? handleCloseModal : undefined}
        onEsc={!isAlertActive && isLast ? handleCloseModal : undefined}
        className={joinClasses(styles.root, className)}>
        <Layout className={styles.header}>
          <Text size="m" weight="bold">
            {title}
          </Text>
          <Button
            label="Закрыть"
            view="clear"
            iconRight={IconClose}
            onlyIcon
            onClick={isLast ? handleCloseModal : undefined}
            size="s"
          />
        </Layout>
        {children}
      </ModalConsta>
    </>
  )
}

export default Modal
