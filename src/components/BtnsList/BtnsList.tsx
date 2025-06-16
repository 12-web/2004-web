import { Button } from '@consta/uikit/Button'
import { useRef, useState } from 'react'
import { IconArrowDown } from '@consta/icons/IconArrowDown'
import { Popover } from '@consta/uikit/Popover'
import { Layout } from '@consta/uikit/Layout'

import styles from './styles.module.css'

export type BtnsListProps = {
  buttonName: string
  btns: {
    label: string
    handleClick: (label: string) => void
  }[]
}

const BtnsList = ({ buttonName, btns }: BtnsListProps) => {
  const anchorRef = useRef<HTMLButtonElement>(null)

  const [isPopoverVisible, setIsPopoverVisible] = useState(false)

  const handleClickOnAnchor = () => {
    setIsPopoverVisible(!isPopoverVisible)
  }

  return (
    <>
      <Button
        className="button"
        label={buttonName}
        size="s"
        view="secondary"
        iconRight={IconArrowDown}
        onClick={handleClickOnAnchor}
        ref={anchorRef}
      />
      {isPopoverVisible && (
        <Popover
          className={styles.popover}
          direction="downStartLeft"
          spareDirection="downLeft"
          offset="xs"
          arrowOffset={0}
          onClickOutside={handleClickOnAnchor}
          isInteractive={true}
          anchorRef={anchorRef}
          equalAnchorWidth
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}>
          <Layout direction="column" className={styles.btnList}>
            {btns.map((btn, i) => (
              <Button
                key={i + btn.label}
                label={btn.label}
                size="s"
                view="clear"
                onClick={() => btn.handleClick(btn.label)}
              />
            ))}
          </Layout>
        </Popover>
      )}
    </>
  )
}

export default BtnsList
