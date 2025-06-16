import { DatePickerProps, DatePickerPropType } from '@consta/uikit/DatePicker'
import { SelectProps } from '@consta/uikit/Select'
import { UseFormRegisterReturn } from 'react-hook-form'

type Registered<TFieldName extends string = string> = UseFormRegisterReturn<TFieldName>

export type Props<TYPE extends DatePickerPropType = 'date'> = DatePickerProps<TYPE> & {
  registered: Registered
}
