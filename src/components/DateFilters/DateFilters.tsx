import { Layout } from '@consta/uikit/Layout'
import { Radio } from '@consta/uikit/Radio'
import { Text } from '@consta/uikit/Text'
import { TextField } from '@consta/uikit/TextField'
import { DatePicker } from '@consta/uikit/DatePicker'
import { IconCalendar } from '@consta/icons/IconCalendar'
import { useDateFilter } from '@hooks/useDateFilter'
import {
  firstDayMonth,
  getFirstWeekDay,
  lastDayMonth,
  resetDayHours,
  setMaxDayHours,
} from '@utils/dates'

import styles from './styles.module.css'

type DateFiltersProps = ReturnType<typeof useDateFilter>

const DateFilters = ({
  month,
  setMonth,
  year,
  setYear,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  filterRange,
  setFilterRange,
}: DateFiltersProps) => {
  return (
    <Layout className={styles.dates}>
      <Radio
        label="Текущая неделя"
        size="s"
        checked={filterRange === 'week'}
        onChange={() => {
          const resetFirstWeekDate = resetDayHours(getFirstWeekDay())
          setStartDate(resetFirstWeekDate)
          setEndDate(new Date())
          setFilterRange('week')
        }}
      />
      <Radio
        label="Вчера"
        size="s"
        name="date"
        checked={filterRange === 'yesterday'}
        onChange={() => {
          setFilterRange('yesterday')
          const today = new Date()
          today.setDate(today.getDate() - 1)

          setStartDate(resetDayHours(today))
          setEndDate(setMaxDayHours(today))
        }}
      />
      <Radio
        label="Сегодня"
        size="s"
        name="date"
        checked={filterRange === 'today'}
        onChange={() => {
          setFilterRange('today')
          setStartDate(resetDayHours(new Date()))
          setEndDate(new Date())
        }}
      />
      <Radio
        label="Месяц"
        size="s"
        name="date"
        checked={filterRange === 'month'}
        onChange={() => {
          setFilterRange('month')
          const newMonth = year && month ? new Date(+year, +month - 1) : new Date()

          setStartDate(firstDayMonth(newMonth))
          setEndDate(lastDayMonth(newMonth))
        }}
      />
      <TextField
        className={styles.month}
        value={month}
        type="number"
        size="s"
        step={1}
        onChange={value => {
          setMonth(value)

          if (value && year) {
            const date = new Date(+year, +value - 1)

            setStartDate(firstDayMonth(date))
            setEndDate(lastDayMonth(date))
          }
        }}
        min="1"
        max="12"
        disabled={filterRange !== 'month'}
      />
      <TextField
        className={styles.year}
        value={year}
        type="number"
        size="s"
        step={1}
        onChange={value => {
          setYear(value)
          if (value && month) {
            const date = new Date(+value, +month - 1)
            setStartDate(firstDayMonth(date))
            setEndDate(lastDayMonth(date))
          }
        }}
        min="2020"
        max="2030"
        disabled={filterRange !== 'month'}
      />
      <Radio
        label="Даты с"
        size="s"
        name="date"
        checked={filterRange === 'interval'}
        onChange={() => setFilterRange('interval')}
      />
      <DatePicker
        className={styles.date_picker}
        size="s"
        value={startDate}
        format="dd/MM/yyyy"
        separator="/"
        placeholder="дд/мм/гггг"
        onChange={setStartDate}
        rightSide={IconCalendar}
        disabled={filterRange !== 'interval'}
      />
      <Text size="s">по</Text>
      <DatePicker
        className={styles.date_picker}
        size="s"
        value={endDate}
        format="dd/MM/yyyy"
        separator="/"
        placeholder="дд/мм/гггг"
        minDate={startDate ? startDate : undefined}
        onChange={setEndDate}
        rightSide={IconCalendar}
        disabled={filterRange !== 'interval'}
      />
    </Layout>
  )
}

export default DateFilters
