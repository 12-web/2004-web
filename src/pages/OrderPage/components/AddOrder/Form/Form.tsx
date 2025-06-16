import { FormProvider, useForm } from 'react-hook-form'
import { Button } from '@consta/uikit/Button'
import { useEffect, useState } from 'react'
import { orderApi } from '@store/services/orderApi'
import { orderLineApi } from '@store/services/orderLineApi'
import { Layout } from '@consta/uikit/Layout'
import orderStatus from '@utils/orderStatus'
import { formatDateISO } from '@utils/dates'
import { useAppDispatch } from '@hooks/redux'
import { closed } from '@store/reducers/Modal/ModalOpenSlice'
import { Inputs } from 'types/order/order'
import { postOrderClientToServer, postOrderLineClientToServer } from '@store/outMappers/order'
import { Tabs } from '@pages/OrderPage/components/Tabs/Tabs'
import { useToast } from '@hooks/useToast'
import OrderLineTable from '../../OrderLineTable/OrderLineTable'

import styles from '@styles/modalForm.module.css'

const Form = () => {
  const [loading, setLoading] = useState<{ isActive: boolean; isIntroduced?: boolean }>({
    isActive: false,
  })

  const { showToast } = useToast()

  const dispatch = useAppDispatch()
  const handleCloseModal = () => dispatch(closed())

  const methods = useForm<Inputs>()
  const { handleSubmit, reset, setValue, clearErrors } = methods

  useEffect(() => {
    const now = formatDateISO(new Date())

    now && setValue('creationDate', now)
  }, [])

  const [postOrder] = orderApi.usePostOrderMutation()
  const [postOrderLine] = orderLineApi.usePostOrderLineMutation()
  const [runOrder] = orderApi.useRunOrderMutation()

  const onSubmit = async (formInputs: Inputs, isIntroduced?: boolean) => {
    try {
      setLoading({ isActive: true, isIntroduced: !!isIntroduced })
      const errors: string[] = []

      const { OrderId, Error } = await postOrder(postOrderClientToServer(formInputs)).unwrap()
      Error && errors.push(Error)

      if (OrderId) {
        for (let index in formInputs.orderLines) {
          const orderLine = formInputs.orderLines[index]

          const { Error } = await postOrderLine(
            postOrderLineClientToServer(orderLine, OrderId),
          ).unwrap()
          Error && errors.push(Error)
        }

        if (isIntroduced) {
          const { Error } = await runOrder({
            OrderId,
            StatusCode: orderStatus.INTRODUCED,
          }).unwrap()
          Error && errors.push(Error)
        }
      }

      if (errors.length) {
        errors.forEach(err => showToast(err))
      } else {
        reset()
        handleCloseModal()
      }
    } catch (err) {
    } finally {
      setLoading({ isActive: false })
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(inputs => onSubmit(inputs, true))} className={styles.form}>
        <Layout direction="column" className={styles.innerFormWrapper}>
          <Tabs isLoading={loading.isActive} isEditMode />
          <OrderLineTable isLoading={loading.isActive} isEditMode />
        </Layout>
        <Layout className={styles.handles}>
          <Button
            onClick={handleSubmit(inputs => onSubmit(inputs))}
            label="Сохранить"
            view="clear"
            size="s"
            loading={loading.isActive && !loading.isIntroduced}
            disabled={loading.isActive && loading.isIntroduced}
          />
          <Button
            type="submit"
            label="Завершить ввод"
            size="s"
            loading={loading.isActive && loading.isIntroduced}
            disabled={loading.isActive && !loading.isIntroduced}
          />
        </Layout>
      </form>
    </FormProvider>
  )
}

export default Form
