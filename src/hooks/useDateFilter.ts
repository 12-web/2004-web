import { resetDayHours } from '@utils/dates'
import { useState } from 'react'

export type FilterRangeType = 'week' | 'yesterday' | 'today' | 'month' | 'interval'

export const useDateFilter = () => {
  const currentYear = new Date().getFullYear().toString()
  const currentMonth = (new Date().getMonth() + 1).toString()

  const firstDay = resetDayHours(new Date())
  const lastDay = new Date()

  const [month, setMonth] = useState<string | null>(currentMonth)
  const [year, setYear] = useState<string | null>(currentYear)

  const [startDate, setStartDate] = useState<Date | null>(firstDay)
  const [endDate, setEndDate] = useState<Date | null>(lastDay)

  const [filterRange, setFilterRange] = useState<FilterRangeType>('today')

  return {
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
  }
}
