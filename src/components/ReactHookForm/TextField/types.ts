import { TextFieldProps } from '@consta/uikit/TextField'
import { UseFormRegisterReturn } from 'react-hook-form'

type Registered<TFieldName extends string = string> = UseFormRegisterReturn<TFieldName>

export type Props<TYPE extends string> = TextFieldProps<TYPE> & {
  registered: Registered
}
