// Преобразует дату в строку формата ISO с учетом временной зоны
export const formatDateISO = (date: Date | null) => {
  if (!date) return
  const offsetMinutes = date.getTimezoneOffset()
  return new Date(date.getTime() - offsetMinutes * 60000).toISOString().slice(0, -1)
}
export const formatStingToDate = (date: string | null) => {
  if (!date) return null
  if (isNaN(Date.parse(date))) return null
  return new Date(date)
}

// Возвращает первый день месяца
export const firstDayMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

// Возвращает последний день месяца
export const lastDayMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0)
}

// Добавляет 0 к числу месяца или дня '02'
const addZero = (num: number) => {
  return num.toString().padStart(2, '0')
}

// Возвращает из строки ISO дату формата DD/MM/YYYY
export const formatDateFromISO = (date: string) => {
  const newDate = new Date(date)
  return [addZero(newDate.getDate()), addZero(newDate.getMonth() + 1), newDate.getFullYear()].join(
    '/',
  )
}
// formats date to DD.MM.YYYY
export const formatToDDMMYYYY = (date: Date) => {
  if (!date) return ''
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0') // Months are zero-based
  const year = date.getFullYear()
  return `${day}.${month}.${year}`
}

// Обнуление времени у даты. Пример Tue Jan 28 2025 00:00:00
export const resetDayHours = (date: Date) => {
  if (!date) return null
  const newDate = new Date(date)
  newDate.setHours(0, 0, 0, 0)

  return newDate
}

// Установление максимального времени у даты. Пример Tue Jan 28 2025 23:59:59
export const setMaxDayHours = (date: Date) => {
  if (!date) return null
  const newDate = new Date(date)
  newDate.setHours(23, 59, 59, 0)

  return newDate
}

// Возвращает первый день месяца
export const getFirstWeekDay = () => {
  const today = new Date()
  const first = today.getDate() - today.getDay() + 1
  const firstWeekDay = new Date(today.setDate(first))

  return firstWeekDay
}

// Обнуление времени у даты в формате ISO. Пример Tue Jan 28 2025 23:59:59 => Tue Jan 28 2025 00:00:00
export const resetISODateHours = (date: string): string =>
  formatDateISO(resetDayHours(new Date(date))) || ''
