import { useEffect, useState } from 'react'
import { MenuItems } from './types'
import { Menu as MenuConstaUi } from '@consta/header/Menu'
import { useLocation } from 'react-router'

import style from './style.module.css'

const oldReports = [
  { label: 'Отчёт статуса заказов', href: '/report/repOrderStatus' },
  { label: 'Отчет приход-расход', href: '/report/repIncOut' },
  { label: 'Отчет приход', href: '/report/repInc' },
  { label: 'Отчет расход', href: '/report/repOut' },
  { label: 'Отчет по остаткам по всем статусам', href: '/report/repStockAllStatuses' },
  { label: 'Получить Отчёт движения паллет', href: '/report/repMoveSSCC' },
  { label: 'Отчёт по отгруженным паллетоместам', href: '/report/repShippedPalletPlaces' },
]

const newReports = [
  { label: 'Просмотр остатков' },
  { label: 'Производственная сводка (приход)', href: '/report/repInc' },
  { label: 'Производственная сводка (расход)' },
  { label: 'ОСВ (оборотно-сальдовая ведомость)' },
  { label: 'Отчет движения по ячейкам или товарам' },
  { label: 'Журнал регистрации АТС/вагонов' },
  { label: 'Форма МХ-2' },
  { label: 'Форма МХ-20' },
]

const defaultData: MenuItems = [
  { label: 'Заказы', href: '/orders' },
  {
    label: 'ASN',
    href: '/asn',
  },
  { label: 'Товары', href: '/goods' },
  {
    label: 'Отчеты',
    href: '/report',
    subMenu: oldReports,
  },
  { label: 'Помощь', href: '/help' },
  { label: 'О компании', href: '/about' },
]

const Menu = () => {
  const [data, setData] = useState<MenuItems>(defaultData)
  const location = useLocation()

  useEffect(() => {
    const updatedLinks = defaultData.map(item =>
      item.href && location.pathname.includes(item.href) ? { ...item, active: true } : item,
    )

    setData(updatedLinks)
  }, [location.pathname])

  return <MenuConstaUi className={style.menu} items={data} />
}

export default Menu
