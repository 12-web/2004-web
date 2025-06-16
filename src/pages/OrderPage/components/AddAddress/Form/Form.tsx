import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import TextField from '@components/ReactHookForm/TextField'
import { Grid } from '@consta/uikit/Grid'
import { Button } from '@consta/uikit/Button'
import { message } from '@utils/userMessages/FormMessages'
import { clientApi } from '@store/services/clientApi'
import Combobox from '@components/ReactHookForm/ComboBox'
import { shipmentAddressApi } from '@store/services/shipmentAddressApi'
import { Inputs } from 'types/address/address'
import { postAddressToServer } from '@store/outMappers/address'
import { useToast } from '@hooks/useToast'
import { useAppDispatch } from '@hooks/redux'
import { closed } from '@store/reducers/Modal/ModalOpenSlice'

import styles from './styles.module.css'

const Form = () => {
  const methods = useForm<Inputs>()
  const { register, handleSubmit, reset } = methods
  const [postAddress, { data, isSuccess, isLoading }] =
    shipmentAddressApi.usePostShipmentAddressMutation()

  const { showToast } = useToast()

  const dispatch = useAppDispatch()

  const handleCloseModal = () => dispatch(closed())

  const onSubmit: SubmitHandler<Inputs> = async formInputs => {
    try {
      const { result, Error } = await postAddress(postAddressToServer(formInputs)).unwrap()

      if (result) {
        showToast('Новый адрес клиента успешно добавлен', 'success')
        handleCloseModal()
        reset()
      }

      Error && showToast(Error)
    } catch (err) {}
  }

  const { data: clients } = clientApi.useGetClientsQuery()

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.root}>
        <Grid rowGap="s">
          <Combobox
            items={clients?.Clients || []}
            registered={register('client', { required: message.required })}
            required
            label="Клиент"
            onChange={() => {}}
            size="s"
            placeholder="Клиент"
          />
          <TextField
            registered={register('code', {
              required: message.required,
              setValueAs: (value: string) => value.trim(),
            })}
            required
            type="text"
            placeholder="Код нового адреса"
            label="Код нового адреса"
            size="s"
          />
          <TextField
            registered={register('label', {
              required: message.required,
              setValueAs: (value: string) => value.trim(),
            })}
            required
            type="text"
            placeholder="Наименование адреса доставки"
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
            placeholder="Адрес доставки"
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

export default Form
