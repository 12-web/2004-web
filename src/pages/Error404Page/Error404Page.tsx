import { useNavigate } from 'react-router'
import { Responses404 } from '@consta/uikit/Responses404'
import { Button } from '@consta/uikit/Button'

import styles from './styles.module.css'

const Error404Page = () => {
  const navigate = useNavigate()
  const goHome = () => navigate('/')
  const goBack = () => navigate(-1)

  return (
    <Responses404
      className={styles.container}
      description="Возможно, эту страницу уже удалили, или в вашей ссылке ошибка"
      actions={[
        <Button
          key="back"
          className={styles.button}
          view="ghost"
          label="Вернуться назад"
          onClick={goBack}
        />,
        <Button
          key="main"
          className={styles.button}
          view="ghost"
          label="На главную"
          onClick={goHome}
        />,
      ]}
    />
  )
}

export default Error404Page
