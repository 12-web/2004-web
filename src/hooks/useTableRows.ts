import { useState } from 'react'

export const useTableRows = () => {
  const [rows, setRows] = useState<{ id: number }[]>([])
  const [selectedRows, setSelectedRows] = useState<{ id: number }[]>([])

  const addLine = () => setRows([...rows, { id: Date.now() }])

  const removeLine = (rowId: number) => {
    setRows(oldRows => oldRows.filter(({ id }) => id !== rowId))
  }

  const setFilteredRowData = (rowId: number, newData: { [key: string]: string | undefined }) => {
    setRows(rows => rows.map(row => (row.id === rowId ? { ...row, ...newData } : row)))
  }

  return { rows, selectedRows, setRows, setSelectedRows, addLine, removeLine, setFilteredRowData }
}
