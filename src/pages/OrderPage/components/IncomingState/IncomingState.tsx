import { Text } from '@consta/uikit/Text'
import { Badge } from '@consta/uikit/Badge'
import { useMemo } from 'react'

type IncomingStateProps = {
  status: string | null
}

export const IncomingState = ({ status }: IncomingStateProps) => {
  const tagColor = useMemo(() => {
    switch (true) {
      case status === 'Редактируется':
        return '#FADB14'
      case status === 'Введен':
        return '#FA8C16'
      case status === 'В пачке':
        return '#F5222D'
      case status === 'Просчитан':
        return '#EB2F96'
      case status === 'Перемещается в пикинг/OA':
        return '#4532FF'
      case status === 'В подборке':
        return '#1ABAFF'
      case status === 'Подобран':
        return '#13C2C2'
      case status === 'Ушел со склада':
        return '#52C41A'
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
