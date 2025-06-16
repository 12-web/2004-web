import { opened } from '@store/reducers/Alert/AlertSlice'
import { measurementUnitApi } from '@store/services/measurementUnitApi'
import { Good } from '@store/types/goodApi'
import { MUnits } from '@store/types/measurementUnitApi'
import { useCallback, useEffect, useState } from 'react'
import { useAppDispatch } from './redux'

export const useMUDropDown = (
  value: Good,
): [MUnits, boolean, boolean, (open: boolean) => Promise<void>] => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<MUnits>([])
  const [isDisabled, setIsDisabled] = useState(true)
  const [getMU] = measurementUnitApi.useLazyGetMeasurementUnitsQuery()

  const dispatch = useAppDispatch()

  useEffect(() => {
    setIsDisabled(!value)
  }, [value])

  const onDropDown = useCallback(
    async (open: boolean) => {
      if (open) {
        try {
          setIsLoading(true)

          const { MU = [], Error } = await getMU({ GoodItemId: value.id }).unwrap()
          Error && dispatch(opened({ message: Error }))

          setData(MU)
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
