import { useEffect } from 'react'
import { Grid, GridItem } from '@consta/uikit/Grid'
import TextField from '@components/ReactHookForm/TextField'
import Combobox from '@components/ReactHookForm/ComboBox'
import { useFormContext } from 'react-hook-form'
import DatePicker from '@components/ReactHookForm/DatePicker'
import { warehouseApi } from '@store/services/warehouseApi'
import { IconCalendar } from '@consta/icons/IconCalendar'
import { message } from '@utils/userMessages/FormMessages'
import { formatDateFromISO } from '@utils/dates'
import ReplaceWithViewTextField from '@shared/Form/ReplaceWithViewTextField'
import { shipmentAddressApi } from '@store/services/shipmentAddressApi'
import { clientApi } from '@store/services/clientApi'
import { Button } from '@consta/uikit/Button'
import { IconAdd } from '@consta/icons/IconAdd'
import { Tabs as TabsUI } from '@components/Tabs/Tabs'
import { useAppDispatch } from '@hooks/redux'
import { opened } from '@store/reducers/Modal/ModalOpenSlice'
import modals from '@utils/modals'
import { useToast } from '@hooks/useToast'

import styles from '@styles/modalForm.module.css'

export type TabsProps = {
  isEditMode: boolean
  isLoading: boolean
}

export const Tabs = ({ isEditMode, isLoading }: TabsProps) => {
  const { register, setValue: setValueForm, resetField, watch } = useFormContext()

  const { showToast } = useToast()

  const errors = []

  const { data: warehouses } = warehouseApi.useGetWarehousesQuery()

  const { data: clients } = clientApi.useGetClientsQuery()

  const [getShipAddresses, { data: shipData }] = shipmentAddressApi.useLazyGetShipAddressesQuery()

  //TODO - обработка ошибок с 200 статусом от методов выше
  // errors.length && errors.forEach(err => showErrorToast(err))

  const dispatch = useAppDispatch()
  const handleOpenModal = (id: string) => dispatch(opened(id))

  useEffect(() => {
    if (!isEditMode) return
    // обновление списка Склад доставки при активации при переходе в режим редактирования
    const client = watch('client')
    client?.id && getShipAddresses({ ClientId: client?.id })
  }, [isEditMode])

  return (
    <TabsUI>
      {({ step, steps }) => (
        <>
          <Grid cols={2} colGap="s" className={step === steps[0] ? undefined : styles.hidden}>
            <GridItem>
              <Grid rowGap="s">
                <TextField
                  registered={register('orderNumber', {
                    required: message.required,
                    setValueAs: (value: string) => value.trim(),
                  })}
                  readOnly={!isEditMode}
                  required={isEditMode}
                  type="text"
                  label="Номер заказа"
                  size="s"
                  disabled={isLoading}
                  placeholder="Введите номер заказа"
                />
                <Grid cols={2} yAlign="top" gap="s">
                  <ReplaceWithViewTextField
                    isReplacing={!isEditMode}
                    label="Клиент"
                    path="client.label">
                    <Combobox
                      items={clients?.Clients || []}
                      registered={register('client', { required: message.required })}
                      required={isEditMode}
                      label="Клиент"
                      onChange={value => {
                        setValueForm('clientCode', value?.code || '')
                        value?.id && getShipAddresses({ ClientId: value?.id })
                        resetField('shipmentAddress')
                        resetField('shipmentAddressCode')
                      }}
                      size="s"
                      disabled={isLoading}
                      placeholder="Выберите"
                    />
                  </ReplaceWithViewTextField>
                  <TextField
                    registered={register('clientCode')}
                    readOnly
                    type="text"
                    label="Клиент"
                    size="s"
                    placeholder="Клиент"
                  />
                  {/* <Grid cols={2} yAlign="bottom" gap="s" className={styles.fieldWithBtn}>
                    <TextField
                      registered={register('clientCode')}
                      readOnly
                      type="text"
                      label="Клиент"
                      size="s"
                      placeholder="Клиент"
                    />
                    <Button
                      size="s"
                      view="secondary"
                      iconRight={IconAdd}
                      onlyIcon
                      onClick={() => handleOpenModal(modals.ADD_NEW_CLIENT)}
                      disabled={!isEditMode}
                    />
                  </Grid> */}
                </Grid>
                <Grid cols={2} yAlign="top" gap="s">
                  <ReplaceWithViewTextField
                    isReplacing={!isEditMode}
                    label="Адрес доставки"
                    path="shipmentAddress.label">
                    <Combobox
                      items={shipData?.ShipAddresses || []}
                      registered={register('shipmentAddress', { required: message.required })}
                      required={isEditMode}
                      label="Адрес доставки"
                      onChange={value => setValueForm('shipmentAddressCode', value?.code || '')}
                      size="s"
                      disabled={!shipData?.ShipAddresses?.length || isLoading}
                      placeholder="Выберите"
                    />
                  </ReplaceWithViewTextField>
                  <TextField
                    registered={register('shipmentAddressCode')}
                    readOnly
                    type="text"
                    placeholder="Адрес"
                    label="Код"
                    size="s"
                  />
                  {/* <Grid cols={2} yAlign="bottom" gap="s" className={styles.fieldWithBtn}>
                    <TextField
                      registered={register('shipmentAddressCode')}
                      readOnly
                      type="text"
                      placeholder="Адрес"
                      label="Код"
                      size="s"
                    />
                    <Button
                      size="s"
                      view="secondary"
                      iconRight={IconAdd}
                      onlyIcon
                      onClick={() => handleOpenModal(modals.ADD_NEW_CLIENT_ADDRESS)}
                      disabled={!isEditMode}
                    />
                  </Grid> */}
                </Grid>
                <Grid cols={2} yAlign="top" gap="s">
                  <ReplaceWithViewTextField
                    isReplacing={!isEditMode}
                    label="Склад отгрузки"
                    path="warehouse.label">
                    <Combobox
                      items={warehouses?.Warehouse || []}
                      registered={register('warehouse', { required: message.required })}
                      required={isEditMode}
                      label="Склад отгрузки"
                      onChange={value => setValueForm('warehouseCode', value?.code || '')}
                      size="s"
                      disabled={isLoading}
                      placeholder="Выберите"
                    />
                  </ReplaceWithViewTextField>
                  <TextField
                    registered={register('warehouseCode')}
                    readOnly
                    type="text"
                    placeholder="Склад отгрузки"
                    label="Код"
                    size="s"
                  />
                </Grid>
              </Grid>
            </GridItem>
            <GridItem>
              <Grid rowGap="s">
                <GridItem>
                  <TextField
                    registered={register('driver', {
                      required: message.required,
                      setValueAs: (value: string) => value.trim(),
                    })}
                    readOnly={!isEditMode}
                    required={isEditMode}
                    type="text"
                    label="Водитель"
                    size="s"
                    disabled={isLoading}
                    placeholder="Водитель"
                  />
                </GridItem>
                <GridItem>
                  <TextField
                    registered={register('amNumber')}
                    readOnly={!isEditMode}
                    type="text"
                    label="Номер а/м"
                    size="s"
                    disabled={isLoading}
                    placeholder="Номер а/м"
                  />
                </GridItem>
                <GridItem>
                  <TextField
                    registered={register('sealNumber', { required: message.required })}
                    readOnly={!isEditMode}
                    required={isEditMode}
                    type="text"
                    label="Номер пломбы"
                    size="s"
                    disabled={isLoading}
                    placeholder="Номер пломбы"
                  />
                </GridItem>
              </Grid>
            </GridItem>
          </Grid>
          <Grid cols={2} colGap="s" className={step === steps[1] ? undefined : styles.hidden}>
            <GridItem>
              <Grid rowGap="s">
                <ReplaceWithViewTextField
                  isReplacing={!isEditMode}
                  path="creationDate"
                  label="Создан"
                  valueModifier={formatDateFromISO}>
                  <DatePicker
                    registered={register('creationDate', {
                      required: message.required,
                      valueAsDate: true,
                    })}
                    rightSide={IconCalendar}
                    size="s"
                    label="Создан"
                    disabled
                    format="dd/MM/yyyy"
                    placeholder="дд/мм/гггг"
                  />
                </ReplaceWithViewTextField>
                <ReplaceWithViewTextField
                  isReplacing={!isEditMode}
                  path="loadStartDate"
                  label="Начало загрузки"
                  valueModifier={formatDateFromISO}>
                  <DatePicker
                    registered={register('loadStartDate', {
                      required: message.required,
                      valueAsDate: true,
                    })}
                    rightSide={IconCalendar}
                    size="s"
                    label="Начало загрузки"
                    required={isEditMode}
                    disabled={isLoading}
                    format="dd/MM/yyyy"
                    placeholder="дд/мм/гггг"
                  />
                </ReplaceWithViewTextField>
                <ReplaceWithViewTextField
                  isReplacing={!isEditMode}
                  path="departureDate"
                  label="Убытие машины"
                  valueModifier={formatDateFromISO}>
                  <DatePicker
                    registered={register('departureDate', {
                      required: message.required,
                      valueAsDate: true,
                    })}
                    rightSide={IconCalendar}
                    size="s"
                    label="Убытие машины"
                    required={isEditMode}
                    disabled={isLoading}
                    format="dd/MM/yyyy"
                    placeholder="дд/мм/гггг"
                  />
                </ReplaceWithViewTextField>
              </Grid>
            </GridItem>
            <GridItem>
              <Grid rowGap="s">
                <ReplaceWithViewTextField
                  isReplacing={!isEditMode}
                  path="shipmentDate"
                  label="Дата отгрузки"
                  valueModifier={formatDateFromISO}>
                  <DatePicker
                    registered={register('shipmentDate', {
                      required: message.required,
                      valueAsDate: true,
                    })}
                    rightSide={IconCalendar}
                    size="s"
                    label="Дата отгрузки"
                    required={isEditMode}
                    disabled={isLoading}
                    format="dd/MM/yyyy"
                    placeholder="дд/мм/гггг"
                  />
                </ReplaceWithViewTextField>
                <ReplaceWithViewTextField
                  isReplacing={!isEditMode}
                  path="loadEndDate"
                  label="Окончание загрузки"
                  valueModifier={formatDateFromISO}>
                  <DatePicker
                    registered={register('loadEndDate', {
                      required: message.required,
                      valueAsDate: true,
                    })}
                    rightSide={IconCalendar}
                    size="s"
                    label="Окончание загрузки"
                    required={isEditMode}
                    disabled={isLoading}
                    format="dd/MM/yyyy"
                    placeholder="дд/мм/гггг"
                  />
                </ReplaceWithViewTextField>
              </Grid>
            </GridItem>
          </Grid>
        </>
      )}
    </TabsUI>
  )
}
