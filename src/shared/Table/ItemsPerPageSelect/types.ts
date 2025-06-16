export type Limit = {
  label: string
  itemsPerPage: number
}
export type ItemsPerPageSelectProps = {
  itemsPerPage: number
  setItemsPerPage: (itemsPerPage: number) => void
}
