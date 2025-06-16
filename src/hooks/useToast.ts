import { useAppDispatch } from './redux'
import { opened } from '@store/reducers/Alert/AlertSlice'
import { SnackBarItemStatus } from '@consta/uikit/SnackBar'

export const useToast = () => {
  const dispatch = useAppDispatch()

  const showToast = (error: string, status?: SnackBarItemStatus) => {
    dispatch(
      opened({
        message: error,
        status,
      }),
    )
  }

  return { showToast }
}
