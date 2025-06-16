import { HeaderDataCell, HeaderDataCellProps } from '@consta/table/HeaderDataCell'
import { Text } from '@consta/uikit/Text'
import { joinClasses } from '@utils/userMessages/helpers'
import { HTMLAttributes, ReactElement } from 'react'

import styles from './style.module.css'

export type HeaderCellProps = HeaderDataCellProps &
  HTMLAttributes<HTMLDivElement> & {
    icon?: ReactElement
    isActive?: boolean
  }

const HeaderCell = ({ title, className, icon, isActive, ...rest }: HeaderCellProps) => {
  return (
    <HeaderDataCell
      className={joinClasses(styles.root, isActive && styles.isActive, className)}
      {...rest}>
      {title && (
        <Text className={styles.text} size="s" weight="medium" display="inline" truncate>
          {title}
        </Text>
      )}
      {icon}
    </HeaderDataCell>
  )
}

export default HeaderCell
