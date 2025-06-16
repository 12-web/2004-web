import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { Button } from '@consta/uikit/Button'
import { asnApi } from '@store/services/asnApi'
import { useCallback, useEffect, useState } from 'react'
import AsnLineTable from '../../AsnLineTable/AsnLineTable'
import {
  putAsnClientToServer,
  postAsnLineClientToServer,
  putAsnLineClientToServer,
} from '@store/outMappers/asn'
import { asnLineApi } from '@store/services/asnLineApi'
import { Layout } from '@consta/uikit/Layout'
import { Inputs } from 'types/asn/asn'
import { Tabs } from '@pages/AsnPage/components/Tabs/Tabs'
import { useToast } from '@hooks/useToast'

import styles from '@styles/modalForm.module.css'

export type FormProps = {
  asnId: number
}

const Form = ({ asnId }: FormProps) => {
  const [loading, setLoading] = useState(false)

  const [isEditMode, setIsEditMode] = useState(false)
  const toggleEditMode = () => setIsEditMode(!isEditMode)

  const methods = useForm<Inputs>()
  const { handleSubmit, setValue, clearErrors } = methods

  const { data: asn, refetch: asnRefetch } = asnApi.useGetAsnByIdQuery({ AsnId: asnId })
  const [putAsn] = asnApi.usePutAsnMutation()
  const [getAsnLines] = asnLineApi.useLazyGetAsnLinesQuery()
  const [putAsnLine] = asnLineApi.usePutAsnLineMutation()
  const [postAsnLine] = asnLineApi.usePostAsnLineMutation()
  const [deleteAsnLine] = asnLineApi.useDeleteAsnLineMutation()

  const { showToast } = useToast()

  const setAsn = useCallback(() => {
    if (asn?.Asn) {
      const data = asn.Asn
      setValue('no', data.no)
      setValue('extNo', data.extNo)
      setValue('operator', data.operator)
      setValue('comment', data.comment)
      setValue('client', data.client)
      setValue('clientCode', data.clientCode)
      setValue('incomingNo', data.incomingNo)
      setValue('organization', data.organization)
      setValue('warehouse', data.warehouse)
      setValue('creationDate', data.creationDate)
      setValue('warehouseCode', data.warehouse.code)
      setValue('supplierCode', data.clientCode)
      setValue('organizationCode', data.organization.code)
      setValue('shipmentDate', data.shipmentDate)
    }
  }, [asn])

  useEffect(() => {
    setAsn()
  }, [asn])

  const onCancelEditMode = () => {
    clearErrors()
    setAsn()
    asnRefetch()
    toggleEditMode()
  }

  const onSubmit: SubmitHandler<Inputs> = async formInputs => {
    try {
      setLoading(true)
      const errors: string[] = []

      const { result, Error } = await putAsn(putAsnClientToServer(formInputs, asnId)).unwrap()
      Error && errors.push(Error)

      if (result == 'Ok') {
        const { AsnLine } = await getAsnLines({ AsnId: asnId }).unwrap()

        for (let asnLineId in formInputs.asnLines) {
          const updatedAsnLine = formInputs.asnLines[asnLineId]
          const isInSavedAsnLines = AsnLine?.find(
            savedAsnLine => savedAsnLine.id === parseInt(asnLineId),
          )
          if (isInSavedAsnLines) {
            const { Error } = await putAsnLine(
              putAsnLineClientToServer(updatedAsnLine, asnId, parseInt(asnLineId)),
            ).unwrap()
            Error && errors.push(Error)
          } else {
            const { Error } = await postAsnLine(
              postAsnLineClientToServer(updatedAsnLine, asnId),
            ).unwrap()
            Error && errors.push(Error)
          }
        }

        AsnLine?.forEach(async savedAsnLine => {
          const isInUpdatedAsnLine = formInputs.asnLines?.[savedAsnLine.id]
          if (!isInUpdatedAsnLine) {
            const { Error } = await deleteAsnLine({ id: savedAsnLine.id }).unwrap()
            Error && errors.push(Error)
          }
        })
      }

      if (errors.length) {
        errors.forEach(err => showToast(err))
      } else {
        onCancelEditMode()
      }
    } catch (err) {
      //TODO добавить в алерт исключения
    } finally {
      setLoading(false)
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Layout direction="column" className={styles.innerFormWrapper}>
          <Tabs isEditMode={isEditMode} isLoading={loading} />
          <AsnLineTable
            onCancelEditMode={onCancelEditMode}
            asnId={asnId}
            isEditMode={isEditMode}
            isLoading={loading}
          />
        </Layout>
        <Layout className={styles.handles}>
          {asn?.Asn?.removal && !isEditMode && (
            <Button
              onClick={toggleEditMode}
              disabled={!!isEditMode}
              label="Редактировать"
              type="button"
              size="s"
            />
          )}
          {!!isEditMode && (
            <Button
              disabled={!isEditMode || !asn?.Asn?.editable}
              label="Сохранить"
              type="submit"
              size="s"
            />
          )}
        </Layout>
      </form>
    </FormProvider>
  )
}

export default Form
