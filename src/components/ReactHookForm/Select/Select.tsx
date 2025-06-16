import { Select as SelectRHF, SelectComponent, SelectProps } from '@consta/uikit/Select'
import { useFormContext, UseFormRegisterReturn } from 'react-hook-form'
import { Props } from './types'

const Select = (props: Props) => {
  const { watch, setValue } = useFormContext()
  const value = watch(props.registered.name)
  const { name } = props.registered
  const { formState, getFieldState } = useFormContext()
  const { error } = getFieldState(name, formState)

  return (
    <SelectRHF
      caption={error?.message}
      status={error ? 'alert' : undefined}
      {...props}
      value={props.value || value}
      onChange={(newValue, changeProps) => {
        setValue(name, newValue, { shouldValidate: true })
        props?.onChange?.(newValue, changeProps)
      }}
    />
  )
}

export default Select
