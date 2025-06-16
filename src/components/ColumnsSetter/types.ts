export type ColumnsNameItemProps<DATA> = {
  title: string
  accessor: keyof DATA
  isRequired?: boolean
  disabled?: boolean
}

export type ColumnsNameProps<DATA> = { [key: string]: ColumnsNameItemProps<DATA> }
