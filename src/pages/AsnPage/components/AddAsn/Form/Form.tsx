import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { Button } from '@consta/uikit/Button'
import { asnApi } from '@store/services/asnApi'
import { FC, useEffect, useState } from 'react'
import { asnLineApi } from '@store/services/asnLineApi'
import { Layout } from '@consta/uikit/Layout'
import { formatDateISO } from '@utils/dates'
import { useAppDispatch } from '@hooks/redux'
import { closed } from '@store/reducers/Modal/ModalOpenSlice'
import { Inputs } from 'types/asn/asn'
import { postAsnClientToServer, postAsnLineClientToServer } from '@store/outMappers/asn'
import { Tabs } from '@pages/AsnPage/components/Tabs/Tabs'
import { useToast } from '@hooks/useToast'
import AsnLineTable from '../../AsnLineTable/AsnLineTable'

import styles from '@styles/modalForm.module.css'

type FormProps = {}

const Form = (props: FormProps) => {
  const [loading, setLoading] = useState(false)

  const { showToast } = useToast()

  const methods = useForm<Inputs>()

  const { handleSubmit, reset, setValue } = methods

  const dispatch = useAppDispatch()
  const handleCloseModal = () => dispatch(closed())

  useEffect(() => {
    const now = formatDateISO(new Date())

    now && setValue('creationDate', now)
  }, [])

  const [postAsn] = asnApi.usePostAsnMutation()
  const [postAsnLine] = asnLineApi.usePostAsnLineMutation()

  const onSubmit: SubmitHandler<Inputs> = async formInputs => {
    try {
      setLoading(true)

      const errors: string[] = []

      const { AsnId, Error } = await postAsn(postAsnClientToServer(formInputs)).unwrap()
      Error && errors.push(Error)

      if (AsnId) {
        for (let index in formInputs.asnLines) {
          const asnLine = formInputs.asnLines[index]
          const { Error } = await postAsnLine(postAsnLineClientToServer(asnLine, AsnId)).unwrap()
          Error && errors.push(Error)
        }
      }

      if (errors.length) {
        errors.forEach(error => showToast(error))
      } else {
        reset()
        handleCloseModal()
      }
    } catch (err) {
    } finally {
      setLoading(false)
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Layout direction="column" className={styles.innerFormWrapper}>
          <Tabs isLoading={loading} isEditMode />
          <AsnLineTable isLoading={loading} isEditMode />
        </Layout>
        <Layout className={styles.handles}>
          <Button label="Сохранить" type="submit" size="s" loading={loading} />
        </Layout>
      </form>
    </FormProvider>
  )
}

export default Form
