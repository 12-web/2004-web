import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router'

import { Button } from '@consta/uikit/Button'
import { TextField } from '@consta/uikit/TextField'
import { Layout } from '@consta/uikit/Layout'

import { useAppDispatch, useAppSelector } from '@hooks/redux'
import { setToken } from '@store/reducers/User/AuthUserSlice'
import { authApi } from '@store/services/authApi'

import styles from './styles.module.css'

const { useLoginMutation } = authApi

const DEFAULT_ROUTE = '/asn'

const Login = () => {
  const { token } = useAppSelector(state => state.authUser)

  // если пользователь уже авторизован - перевод на стартовую страницу /asn
  if (token) return <Navigate to={DEFAULT_ROUTE} />

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [login, { data, isLoading }] = useLoginMutation()

  const [user, setUser] = useState<string | null>(null)
  const [password, setPassword] = useState<string | null>(null)

  const isDisabled = !user || !password

  const handleSubmit = async () => {
    try {
      const { TockenId } = await login({ user, password }).unwrap()

      if (TockenId) {
        dispatch(setToken(TockenId))
        navigate(DEFAULT_ROUTE)
      }
    } catch (err) {
      // TODO добавить обработчик на ошибку запроса
      console.error('Failed to login:', err)
    }
  }

  return (
    <Layout className={styles.container}>
      <Layout className={styles.form} direction="column">
        <TextField
          className={styles.field}
          label="Логин"
          placeholder="Логин"
          labelPosition="top"
          value={user}
          onChange={value => setUser(value)}
        />
        <TextField
          className={styles.field}
          label="Пароль"
          placeholder="Пароль"
          labelPosition="top"
          type="password"
          value={password}
          status={data?.Error ? 'alert' : undefined}
          caption={data?.Error || undefined}
          onChange={value => setPassword(value)}
        />
        <Button label="Войти" disabled={isDisabled} loading={isLoading} onClick={handleSubmit} />
      </Layout>
    </Layout>
  )
}

export default Login
