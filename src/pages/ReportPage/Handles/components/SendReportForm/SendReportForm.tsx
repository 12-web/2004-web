import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { Button } from '@consta/uikit/Button'
import { Layout } from '@consta/uikit/Layout'
import { useAppDispatch } from '@hooks/redux'
import { closed } from '@store/reducers/Modal/ModalOpenSlice'
import { Inputs } from 'types/report/report'
import TextField from '@components/ReactHookForm/TextField'

import { useToast } from '@hooks/useToast'
import { message } from '@utils/userMessages/FormMessages'

import styles from './styles.module.css'

const SendReportForm = () => {
  const { showToast } = useToast()

  const methods = useForm<Inputs>()

  const { handleSubmit, register, reset, setValue } = methods

  const dispatch = useAppDispatch()
  const handleCloseModal = () => dispatch(closed())

  const onSubmit: SubmitHandler<Inputs> = async formInputs => {
    try {
      console.log(formInputs)
      showToast('Отчет отправлен на почту', 'success')
    } catch (err) {}
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Layout className={styles.wrapper}>
          <TextField
            registered={register('email', { required: message.required })}
            type="text"
            size="s"
            placeholder="your@email.here"
            className={styles.input}
          />
          <Button
            className="button"
            label="Отправить по почте"
            type="submit"
            size="s"
            view="secondary"
          />
        </Layout>
      </form>
    </FormProvider>
  )
}

export default SendReportForm
