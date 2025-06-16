import { PropsWithChildren } from 'react'
import { Props } from './types'
import { useFormContext } from 'react-hook-form'
import { TextField } from '@consta/uikit/TextField'
import { joinClasses } from '@utils/userMessages/helpers'

import styles from './styles.module.css'

const ReplaceWithViewTextField = ({
  isReplacing,
  path,
  label,
  rootClassName,
  children,
  valueModifier,
}: PropsWithChildren<Props>) => {
  const { watch } = useFormContext()
  const value = watch(path)

  const rootClass = joinClasses(rootClassName, isReplacing ? 'hidden' : '')

  const replacedRootClass = joinClasses(rootClassName, !isReplacing ? 'hidden' : '')

  return (
    <>
      <div className={replacedRootClass}>
        <TextField
          value={valueModifier?.(value) || value}
          readOnly
          type="textarea"
          label={label}
          size="s"
          className={styles.textarea}
        />
      </div>
      <div className={rootClass}>{children}</div>
    </>
  )
}

export default ReplaceWithViewTextField
