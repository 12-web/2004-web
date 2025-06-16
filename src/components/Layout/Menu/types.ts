import { MenuDefaultItem } from '@consta/header/Menu'

export type MenuItem = {
  label: string
  href?: string
  target?: string
  active?: boolean
  onClick?: React.EventHandler<React.MouseEvent>
  subMenu?: MenuDefaultItem[]
}

export type MenuItems = MenuItem[]
