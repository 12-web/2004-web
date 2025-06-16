import { TextField as TextFieldConstaUi } from '@consta/uikit/TextField'
import { Props } from './types'
import { useFormContext } from 'react-hook-form'

const getNestedError = (errors: any, path: any) => {
  return path.split('.').reduce((acc: any, part: any) => (acc ? acc[part] : undefined), errors)
}

const TextField = <TYPE extends string>(props: Props<TYPE>) => {
  const { formState, getFieldState } = useFormContext()
  const { onChange, name, ref, ...restRegisteredParams } = props.registered

  const { error } = getFieldState(name, formState)

  return (
    <TextFieldConstaUi
      caption={error?.message}
      status={error ? 'alert' : undefined}
      name={name}
      inputRef={ref}
      {...restRegisteredParams}
      {...props}
      onChange={(value, params) => onChange(params.e)}
    />
  )
}

export default TextField
