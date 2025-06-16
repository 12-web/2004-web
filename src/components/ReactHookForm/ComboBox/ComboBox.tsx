import { ComboboxGroupDefault, Combobox as ComboboxRHF } from '@consta/uikit/Combobox'
import { FC, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { Props } from './types'
import { Supplier } from '@store/types/supplierApi'

const Combobox = <ITEM, GROUP = ComboboxGroupDefault, MULTIPLE extends boolean = false>(
  props: Props<ITEM, GROUP, MULTIPLE>,
) => {
  const {
    watch,
    setValue,
    setFocus,
    formState: { errors },
  } = useFormContext()
  const value: ITEM = watch(props.registered.name)
  const { name, ref } = props.registered
  const { formState, getFieldState } = useFormContext()
  const { error } = getFieldState(name, formState)

  return (
    <ComboboxRHF
      caption={error?.message}
      status={error ? 'alert' : undefined}
      {...props}
      value={value}
      onChange={(newValue, changeProps) => {
        setValue(name, newValue, { shouldValidate: true })
        props?.onChange?.(newValue, changeProps)
      }}
    />
  )
}

export default Combobox
