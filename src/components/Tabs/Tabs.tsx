import { FC, ReactNode, useState } from 'react'
import { Tabs as TabsConsta } from '@consta/uikit/Tabs'
import styles from './styles.module.css'

const defaultSteps: string[] = ['Информация о заказе', 'Дополнительно', 'Скрыть']

const getItemLabel = (label: string) => label

type ChildrenProps = {
  step: string
  steps: string[]
}

export type TabsProps = {
  children: (props: ChildrenProps) => ReactNode
  steps?: string[]
}

export const Tabs = ({ children, steps = defaultSteps }: TabsProps) => {
  const [step, setStep] = useState<string>(steps[0])

  return (
    <>
      <TabsConsta
        value={step}
        onChange={setStep}
        items={steps}
        getItemLabel={getItemLabel}
        size="s"
        view="clear"
        className={styles.root}
      />
      {children({ step, steps })}
    </>
  )
}

export default Tabs
