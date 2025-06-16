import { useMemo, useRef, useState } from 'react'
import { Popover } from '@consta/uikit/Popover'
import { CheckboxGroup } from '@consta/uikit/CheckboxGroup'
import { Button } from '@consta/uikit/Button'
import { IconTable2 } from '@consta/icons/IconTable2'
import { ColumnsNameItemProps } from './types'

import styles from './styles.module.css'

type ColumnsSetterProps<DATA> = {
  cols: ColumnsNameItemProps<DATA>[]
  onSetTableCols: (value: ColumnsNameItemProps<DATA>[] | null) => void
}

const ColumnsSetter = <DATA,>({ cols, onSetTableCols }: ColumnsSetterProps<DATA>) => {
  const defaultCols = Object.values(cols).filter(col => col.title)
  const [isColumnsMenuOpen, setIsColumnsMenuOpen] = useState<boolean>(false)
  const columnsMenuRef = useRef(null)
  const [value, setValue] = useState<ColumnsNameItemProps<DATA>[] | null>(defaultCols)

  const togglePopover = () => setIsColumnsMenuOpen(!isColumnsMenuOpen)

  const items: ColumnsNameItemProps<DATA>[] = useMemo(() => {
    if (value?.length === 1) {
      return cols.map(col =>
        col.accessor === value[0].accessor ? { ...col, disabled: true } : col,
      )
    }
    return cols
  }, [value])

  const handleChangeCols = (value: ColumnsNameItemProps<DATA>[] | null) => {
    setValue(value)
    onSetTableCols(value)
  }

  return (
    <>
      <Button
        className="button"
        label="Столбцы"
        size="s"
        view="secondary"
        iconLeft={IconTable2}
        onClick={togglePopover}
        ref={columnsMenuRef}
      />
      {isColumnsMenuOpen && (
        <Popover
          className={styles.columnsPopover}
          anchorRef={columnsMenuRef}
          isInteractive={true}
          equalAnchorWidth={false}
          direction="leftStartUp"
          spareDirection="downRight"
          offset="xs"
          arrowOffset={0}
          placeholder={undefined}
          onPointerLeaveCapture={undefined}
          onPointerEnterCapture={undefined}
          onClickOutside={() => setIsColumnsMenuOpen(!isColumnsMenuOpen)}>
          <CheckboxGroup
            size="s"
            value={value}
            items={items}
            getItemLabel={item => item.title}
            onChange={handleChangeCols}
            name={'columnsNames'}
          />
        </Popover>
      )}
    </>
  )
}

export default ColumnsSetter
