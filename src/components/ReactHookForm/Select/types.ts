import { SelectProps } from '@consta/uikit/Select'
import { UseFormRegisterReturn } from 'react-hook-form'

type Registered<TFieldName extends string = string> = UseFormRegisterReturn<TFieldName>

export type Props = Omit<SelectProps, 'onChange'> &
  Partial<Pick<SelectProps, 'onChange'>> & {
    registered: Registered
  }
