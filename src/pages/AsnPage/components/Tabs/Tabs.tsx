import { Grid, GridItem } from '@consta/uikit/Grid'
import TextField from '@components/ReactHookForm/TextField'
import Combobox from '@components/ReactHookForm/ComboBox'
import { useFormContext } from 'react-hook-form'
import DatePicker from '@components/ReactHookForm/DatePicker'
import { suppliersApi } from '@store/services/suppliersApi'
import { warehouseApi } from '@store/services/warehouseApi'
import { organizationApi } from '@store/services/organizationApi'
import { IconAdd } from '@consta/icons/IconAdd'
import { Button } from '@consta/uikit/Button'
import { IconCalendar } from '@consta/icons/IconCalendar'
import { message } from '@utils/userMessages/FormMessages'
import { formatDateFromISO, formatToDDMMYYYY } from '@utils/dates'
import ReplaceWithViewTextField from '@shared/Form/ReplaceWithViewTextField'
import { Tabs as TabsUI } from '@components/Tabs/Tabs'
import { opened } from '@store/reducers/Modal/ModalOpenSlice'
import { useAppDispatch } from '@hooks/redux'
import modals from '@utils/modals'

import styles from '@styles/modalForm.module.css'

type TabsProps = {
  isEditMode: boolean
  isLoading: boolean
}

export const Tabs = ({ isEditMode, isLoading }: TabsProps) => {
  const { register, setValue: setValueForm } = useFormContext()

  const { data: suppliers } = suppliersApi.useGetSuppliersQuery()
  const { data: warehouses } = warehouseApi.useGetWarehousesQuery()
  const { data: organizations } = organizationApi.useGetOrganizationQuery()

  //TODO - обработка ошибок с 200 статусом от методов выше

  const dispatch = useAppDispatch()
  const handleOpenAddClient = () => dispatch(opened(modals.ADD_NEW_SUPPLIER))

  return (
    <TabsUI>
      {({ step, steps }) => (
        <>
          <Grid cols={2} colGap="s" className={step === steps[0] ? undefined : styles.hidden}>
            <GridItem>
              <Grid rowGap="s">
                <TextField
                  registered={register('no', {
                    required: message.required,
                    setValueAs: (value: string) => value.trim(),
                  })}
                  readOnly={!isEditMode}
                  required={isEditMode}
                  type="text"
                  label="ASN Номер"
                  placeholder="Введите номер ASN"
                  size="s"
                  disabled={isLoading}
                />
                <GridItem>
                  <Grid cols={2} yAlign="top" gap="s">
                    <ReplaceWithViewTextField
                      isReplacing={!isEditMode}
                      label="Поставщик"
                      path="client.label">
                      <Combobox
                        items={suppliers?.Suppliers || []}
                        registered={register('client', { required: message.required })}
                        required={isEditMode}
                        label="Поставщик"
                        onChange={value => setValueForm('clientCode', value?.code || '')}
                        size="s"
                        disabled={isLoading}
                        placeholder="Выберите"
                      />
                    </ReplaceWithViewTextField>
                    <Grid cols={2} yAlign="bottom" gap="s" className={styles.fieldWithBtn}>
                      <TextField
                        registered={register('clientCode')}
                        readOnly
                        type="text"
                        label="Код"
                        size="s"
                        placeholder="Поставщик"
                      />
                      <Button
                        disabled={!isEditMode || isLoading}
                        size="s"
                        view="secondary"
                        iconRight={IconAdd}
                        onlyIcon
                        onClick={handleOpenAddClient}
                      />
                    </Grid>
                  </Grid>
                </GridItem>
                <GridItem>
                  <Grid cols={2} yAlign="top" gap="s">
                    <ReplaceWithViewTextField
                      isReplacing={!isEditMode}
                      label="Организация"
                      path="organization.label">
                      <Combobox
                        items={organizations?.Organizations || []}
                        registered={register('organization', { required: message.required })}
                        required={isEditMode}
                        label="Организация"
                        onChange={value => setValueForm('organizationCode', value?.code || '')}
                        size="s"
                        disabled={isLoading}
                        placeholder="Выберите"
                      />
                    </ReplaceWithViewTextField>
                    <TextField
                      registered={register('organizationCode')}
                      readOnly
                      type="text"
                      label="Код"
                      size="s"
                      placeholder="Организация-собственник"
                    />
                  </Grid>
                </GridItem>

                <Grid cols={2} yAlign="top" gap="s">
                  <ReplaceWithViewTextField
                    label="Склад"
                    isReplacing={!isEditMode}
                    path="warehouse.label">
                    <Combobox
                      items={warehouses?.Warehouse || []}
                      registered={register('warehouse', { required: message.required })}
                      required={isEditMode}
                      label="Склад"
                      placeholder="Выберите"
                      onChange={value => setValueForm('warehouseCode', value?.code || '')}
                      size="s"
                      disabled={isLoading}
                    />
                  </ReplaceWithViewTextField>
                  <TextField
                    registered={register('warehouseCode')}
                    readOnly
                    type="text"
                    label="Код"
                    size="s"
                    placeholder="Склад"
                  />
                </Grid>
              </Grid>
            </GridItem>
            <GridItem>
              <Grid rowGap="s">
                <TextField
                  registered={register('operator', {
                    required: message.required,
                    setValueAs: (value: string) => value.trim(),
                  })}
                  readOnly={!isEditMode}
                  required={isEditMode}
                  type="text"
                  label="Оператор"
                  size="s"
                  disabled={isLoading}
                  placeholder="Оператор"
                />
                <TextField
                  registered={register('incomingNo', {
                    setValueAs: (value: string) => value.trim(),
                  })}
                  disabled
                  type="text"
                  label="Номер прихода"
                  size="s"
                  placeholder="Номер прихода"
                />
                <TextField
                  registered={register('extNo', {
                    required: message.required,
                    setValueAs: (value: string) => value.trim(),
                  })}
                  readOnly={!isEditMode}
                  required={isEditMode}
                  type="text"
                  label="Внешний номер"
                  placeholder="Внешний номер"
                  size="s"
                />
                <TextField
                  registered={register('comment', { setValueAs: (value: string) => value.trim() })}
                  readOnly={!isEditMode}
                  type="textarea"
                  label="Комментарий"
                  size="s"
                  placeholder="Комментарий"
                />
              </Grid>
            </GridItem>
          </Grid>
          <Grid cols={2} colGap="s" className={step === steps[1] ? undefined : styles.hidden}>
            <GridItem>
              <Grid rowGap="s">
                <ReplaceWithViewTextField
                  isReplacing={!isEditMode}
                  label="Создан"
                  path="creationDate"
                  valueModifier={formatDateFromISO}>
                  <DatePicker
                    registered={register('creationDate', { valueAsDate: true })}
                    readOnly
                    required={isEditMode}
                    rightSide={IconCalendar}
                    size="s"
                    label="Создан"
                    format="dd/MM/yyyy"
                    placeholder="дд/мм/гггг"
                    disabled
                  />
                </ReplaceWithViewTextField>
                <ReplaceWithViewTextField
                  label="Ожидаемое время прибытия"
                  isReplacing={!isEditMode}
                  path="shipmentDate"
                  valueModifier={formatDateFromISO}>
                  <DatePicker
                    registered={register('shipmentDate', {
                      required: message.required,
                      valueAsDate: true,
                    })}
                    readOnly={!isEditMode}
                    required={isEditMode}
                    rightSide={IconCalendar}
                    size="s"
                    label="Ожидаемое время прибытия"
                    format="dd/MM/yyyy"
                    placeholder="дд/мм/гггг"
                  />
                </ReplaceWithViewTextField>
                <ReplaceWithViewTextField
                  label="Время фактического прихода"
                  isReplacing={!isEditMode}
                  path="factDate"
                  valueModifier={formatToDDMMYYYY}>
                  <DatePicker
                    registered={register('factDate', { valueAsDate: true })}
                    readOnly={!isEditMode}
                    rightSide={IconCalendar}
                    size="s"
                    label="Время фактического прихода"
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
