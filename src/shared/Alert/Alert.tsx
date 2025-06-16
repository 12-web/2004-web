import { SnackBar, SnackBarItemStatus } from '@consta/uikit/SnackBar'
import { useAppDispatch, useAppSelector } from '@hooks/redux'
import { closed } from '@store/reducers/Alert/AlertSlice'

import styles from './styles.module.css'

export type SnackBarType = {
  key: number
  message?: string
  status?: SnackBarItemStatus
}

const Alert = () => {
  const { items } = useAppSelector(state => state.alertState)
  const dispatch = useAppDispatch()
  const handleCloseModal = (item: SnackBarType) => dispatch(closed(item))

  return (
    <SnackBar className={styles.root} items={items} onItemClose={item => handleCloseModal(item)} />
  )
}

export default Alert
