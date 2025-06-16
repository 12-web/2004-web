import { Text } from '@consta/uikit/Text'
import { Badge } from '@consta/uikit/Badge'
import { useMemo } from 'react'

type IncomingStateProps = {
  status: string | null
}

const IncomingState = ({ status }: IncomingStateProps) => {
  const tagColor = useMemo(() => {
    switch (true) {
      case status === 'Присвоен номер':
        return '#D1D2DE'
      case status === 'Заполняется':
        return '#F5222D'
      case status === 'Все строки обработаны':
        return '#FADB14'
      case status === 'Обработка завершена':
        return '#52C41A'
      case status === 'Новый':
        return '#2fc2eb'
      default:
        return '#D1D2DE'
    }
  }, [status])

  return (
    <>
      {status !== '-' && (
        <Badge
          style={{
            boxShadow: `inset 0 0 0 var(--badge-size) ${tagColor}`,
            flexShrink: 0,
          }}
          minified
          size="s"
        />
      )}
      <Text size="s" lineHeight="s">
        {status}
      </Text>
    </>
  )
}

export default IncomingState
