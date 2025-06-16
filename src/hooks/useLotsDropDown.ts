import { lotApi } from '@store/services/lotApi'
import { Good } from '@store/types/goodApi'
import { Lots } from '@store/types/lotApi'
import { useCallback, useEffect, useState } from 'react'
import { useAppDispatch } from './redux'
import { opened } from '@store/reducers/Alert/AlertSlice'

export const useLotsDropDown = (
  value: Good,
): [Lots, boolean, boolean, (open: boolean) => Promise<void>] => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<Lots>([])
  const [isDisabled, setIsDisabled] = useState(true)
  const [getLots] = lotApi.useLazyGetLotsQuery()

  const dispatch = useAppDispatch()

  useEffect(() => {
    setIsDisabled(!value)
  }, [value])

  const onDropDown = useCallback(
    async (open: boolean) => {
      if (open) {
        try {
          setIsLoading(true)

          const { Lots = [], Error } = await getLots({ GoodItemId: value.id }).unwrap()
          Error && dispatch(opened({ message: Error }))

          setData(Lots)
        } catch (err) {
        } finally {
          setIsLoading(false)
        }
      }
    },
    [value],
  )

  return [data, isLoading, isDisabled, onDropDown]
}
