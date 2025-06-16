import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import TextField from '@components/ReactHookForm/TextField'
import { Grid } from '@consta/uikit/Grid'
import { Button } from '@consta/uikit/Button'
import { message } from '@utils/userMessages/FormMessages'
import { clientApi } from '@store/services/clientApi'
import { ClientTypeProps } from '@store/types/clientApi'
import { postClientClientToServer } from '@store/outMappers/client'
import { Inputs } from 'types/client/client'
import { useToast } from '@hooks/useToast'
import { useAppDispatch } from '@hooks/redux'
import { closed } from '@store/reducers/Modal/ModalOpenSlice'

import styles from './styles.module.css'

export type ClientFormProps = {
  clientType: ClientTypeProps
}

const ClientForm = ({ clientType }: ClientFormProps) => {
  const methods = useForm<Inputs>()
  const { register, handleSubmit, reset } = methods

  const [postClient, { isLoading }] = clientApi.usePostClientMutation()

  const { showToast } = useToast()

  const dispatch = useAppDispatch()

  const handleCloseModal = () => dispatch(closed())

  const onSubmit: SubmitHandler<Inputs> = async formInputs => {
    try {
      const { result, Error } = await postClient(
        postClientClientToServer(formInputs, clientType),
      ).unwrap()

      if (result) {
        showToast('Новый клиент успешно добавлен', 'success')
        handleCloseModal()
        reset()
      }

      Error && showToast(Error)
    } catch (err) {}
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.root}>
        <Grid rowGap="s">
          <TextField
            registered={register('code', {
              required: message.required,
              setValueAs: (value: string) => value.trim(),
            })}
            required
            type="text"
            placeholder="Код"
            label="Код"
            size="s"
          />
          <TextField
            registered={register('label', {
              required: message.required,
              setValueAs: (value: string) => value.trim(),
            })}
            required
            type="text"
            placeholder="Наименование"
            label="Наименование"
            size="s"
          />
          <TextField
            registered={register('address', {
              required: message.required,
              setValueAs: (value: string) => value.trim(),
            })}
            required
            type="text"
            placeholder="Адрес"
            label="Адрес"
            size="s"
          />
        </Grid>
        <Button
          className={styles.btn}
          label="Сохранить"
          type="submit"
          size="s"
          loading={isLoading}
        />
      </form>
    </FormProvider>
  )
}

export default ClientForm
