import { FormProvider, useForm } from 'react-hook-form'
import { Button } from '@consta/uikit/Button'
import { useCallback, useEffect, useState } from 'react'
import { orderApi } from '@store/services/orderApi'
import {
  postOrderLineClientToServer,
  putOrderClientToServer,
  putOrderLineClientToServer,
} from '@store/outMappers/order'
import OrderLineTable from '../../OrderLineTable/OrderLineTable'
import { orderLineApi } from '@store/services/orderLineApi'
import { Layout } from '@consta/uikit/Layout'
import orderStatus from '@utils/orderStatus'
import { Inputs } from 'types/order/order'
import { Tabs } from '@pages/OrderPage/components/Tabs/Tabs'
import { useToast } from '@hooks/useToast'

import styles from '@styles/modalForm.module.css'

export type FormProps = {
  orderId: number
}

const Form = ({ orderId }: FormProps) => {
  const [loading, setLoading] = useState<{ isActive: boolean; isIntroduced?: boolean }>({
    isActive: false,
  })

  const [isEditMode, setIsEditMode] = useState(false)
  const toggleEditMode = () => setIsEditMode(!isEditMode)

  const methods = useForm<Inputs>()
  const { handleSubmit, setValue, clearErrors } = methods

  const { data: order, refetch: orderRefetch } = orderApi.useGetOrderByIdQuery({ OrderId: orderId })
  const [putOrder] = orderApi.usePutOrderMutation()
  const [getOrderLines] = orderLineApi.useLazyGetOrderLinesQuery()
  const [putOrderLine] = orderLineApi.usePutOrderLineMutation()
  const [postOrderLine] = orderLineApi.usePostOrderLineMutation()
  const [deleteOrderLine] = orderLineApi.useDeleteOrderLineMutation()
  const [runOrder] = orderApi.useRunOrderMutation()

  const { showToast } = useToast()

  const setOrder = useCallback(() => {
    if (order?.Order) {
      const data = order.Order

      setValue('orderNumber', data.no)
      setValue('client', data.client)
      setValue('shipmentAddress', data.shipmentAddress)
      setValue('warehouse', data.warehouse)
      setValue('driver', data.driver)
      setValue('amNumber', data.amNumber)
      setValue('sealNumber', data.sealNumber)
      setValue('warehouse', data.warehouse)
      setValue('loadEndDate', data.loadEndDate)
      setValue('loadStartDate', data.loadStartDate)
      setValue('shipmentDate', data.shipmentDate)
      setValue('creationDate', data.creationDate)
      setValue('departureDate', data.departureDate)
      setValue('warehouseCode', data.warehouse.code)
      setValue('shipmentAddressCode', data.shipmentAddress.code)
      setValue('clientCode', data.clientCode)
    }
  }, [order])

  useEffect(() => {
    setOrder()
  }, [order])

  const onCancelEditMode = () => {
    clearErrors()
    setOrder()
    orderRefetch()
    toggleEditMode()
  }

  const onSubmit = async (formInputs: Inputs, isIntroduced?: boolean) => {
    try {
      setLoading({ isActive: true, isIntroduced: !!isIntroduced })

      const errors: string[] = []

      const { INTRODUCED, EDITED } = orderStatus

      // Перевод в статус Редактируется для позицией со статусом Введен для возможность внесения изменений
      if (order?.Order?.status === 'Введен') {
        const { Error: runError } = await runOrder({
          OrderId: orderId,
          StatusCode: EDITED,
        }).unwrap()
        runError && errors.push(runError)
      }

      const { result, Error: putError } = await putOrder(
        putOrderClientToServer(formInputs, orderId),
      ).unwrap()
      putError && errors.push(putError)

      if (result == 'Ok') {
        const { OrderLine } = await getOrderLines({ OrderId: orderId }, true).unwrap()

        for (let orderLineId in formInputs.orderLines) {
          const updatedOrderLine = formInputs.orderLines[orderLineId]
          const isInSavedOrderLines = OrderLine?.find(
            savedOrderLine => savedOrderLine.id === parseInt(orderLineId),
          )
          if (isInSavedOrderLines) {
            const { Error } = await putOrderLine(
              putOrderLineClientToServer(updatedOrderLine, parseInt(orderLineId)),
            ).unwrap()
            Error && errors.push(Error)
          } else {
            const { Error } = await postOrderLine(
              postOrderLineClientToServer(updatedOrderLine, orderId),
            ).unwrap()
            Error && errors.push(Error)
          }
        }
        OrderLine?.forEach(async savedOrderLine => {
          const isInUpdatedAsnLine = formInputs.orderLines?.[savedOrderLine.id]
          if (!isInUpdatedAsnLine) {
            const { Error } = await deleteOrderLine({ OrderLineId: savedOrderLine.id }).unwrap()
            Error && errors.push(Error)
          }
        })

        // Перевод в статус Введен
        if (isIntroduced) {
          const { Error: runError } = await runOrder({
            OrderId: orderId,
            StatusCode: INTRODUCED,
          }).unwrap()
          runError && errors.push(runError)
        }
      }

      if (errors.length) {
        errors.forEach(err => showToast(err))
      } else {
        onCancelEditMode()
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
          <Tabs isEditMode={isEditMode} isLoading={loading.isActive} />
          <OrderLineTable
            onCancelEditMode={onCancelEditMode}
            orderId={orderId}
            isEditMode={isEditMode}
            isLoading={loading.isActive}
          />
        </Layout>
        <Layout className={styles.handles}>
          {order?.Order?.removal && !isEditMode && (
            <Button onClick={toggleEditMode} label="Редактировать" type="button" size="s" />
          )}
          {!!isEditMode && (
            <>
              <Button
                label="Сохранить"
                size="s"
                view="clear"
                onClick={handleSubmit(inputs => onSubmit(inputs))}
                loading={loading.isActive && !loading.isIntroduced}
                disabled={loading.isActive && loading.isIntroduced}
              />
              <Button
                label="Завершить ввод"
                size="s"
                type="submit"
                loading={loading.isActive && loading.isIntroduced}
                disabled={loading.isActive && !loading.isIntroduced}
              />
            </>
          )}
        </Layout>
      </form>
    </FormProvider>
  )
}

export default Form
