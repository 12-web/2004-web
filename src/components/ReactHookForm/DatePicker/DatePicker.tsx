import { DatePickerPropType, DatePicker as DatePickerRHF } from '@consta/uikit/DatePicker'
import { Props } from './types'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'

const DatePicker = <TYPE extends DatePickerPropType = 'date'>(props: Props<TYPE>) => {
  const { watch, setValue } = useFormContext()
  const value = watch(props.registered.name)
  const { name } = props.registered
  const { formState, getFieldState } = useFormContext()
  const { error } = getFieldState(name, formState)

  return (
    <DatePickerRHF
      caption={error?.message}
      status={error ? 'alert' : undefined}
      {...props}
      value={value}
      format="dd/MM/yyyy"
      onChange={(newValue, changeProps) => {
        setValue(name, newValue, { shouldValidate: true })
        props?.onChange?.(newValue, changeProps)
      }}
    />
  )
}

export default DatePicker
