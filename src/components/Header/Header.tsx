import Menu from '@components/Layout/Menu'

import styles from './styles.module.css'

const Header = () => {
  return (
    <header className={styles.header}>
      <Menu />
    </header>
  )
}

export default Header
