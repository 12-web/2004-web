import { ComboboxGroupDefault, ComboboxProps } from '@consta/uikit/Combobox'
import { UseFormRegisterReturn } from 'react-hook-form'

type Registered<TFieldName extends string = string> = UseFormRegisterReturn<TFieldName>

export type Props<
  ITEM,
  GROUP = ComboboxGroupDefault,
  MULTIPLE extends boolean = false,
> = ComboboxProps<ITEM, GROUP, MULTIPLE> & {
  registered: Registered
}
