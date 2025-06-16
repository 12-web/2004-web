import { Select } from '@consta/uikit/Select'
import { Text } from '@consta/uikit/Text'
import { Limit, ItemsPerPageSelectProps } from './types'

import styles from './styles.module.css'

const limits: Limit[] = [
  {
    label: '25',
    itemsPerPage: 25,
  },
  {
    label: '50',
    itemsPerPage: 50,
  },
  {
    label: '75',
    itemsPerPage: 75,
  },
  {
    label: '100',
    itemsPerPage: 100,
  },
]

const ItemsPerPageSelect = ({ itemsPerPage, setItemsPerPage }: ItemsPerPageSelectProps) => {
  return (
    <div className={styles.root}>
      <Select
        className={styles.select}
        items={limits}
        value={{ label: `${itemsPerPage}`, itemsPerPage: itemsPerPage }}
        size="s"
        onChange={nowValue => setItemsPerPage(nowValue?.itemsPerPage || 50)}
        getItemKey={({ itemsPerPage }) => itemsPerPage}
      />
      <Text size="s" view="secondary">
        строк на странице
      </Text>
    </div>
  )
}

export default ItemsPerPageSelect
