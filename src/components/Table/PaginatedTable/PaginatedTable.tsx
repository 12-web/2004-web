import { useEffect, useMemo, useState } from 'react'
import { Pagination } from '@consta/uikit/Pagination'
import { Component } from './types'
import { ResponsesNothingFound } from '@consta/uikit/ResponsesNothingFound'
import ItemsPerPageSelect from '@shared/Table/ItemsPerPageSelect'
import TableRowsCounter from '@shared/Table/TableRowsCounter'
import { Loader } from '@consta/uikit/Loader'

import styles from './PaginatedTable.module.css'

const PaginatedTable: Component = props => {
  const { data, children, visiblePagCount = 10, isLoading, onSetRows } = props

  const [page, setPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(50)

  const totalPages = Math.ceil(data.length / itemsPerPage)

  const paginatedData = useMemo(() => {
    return data.slice((page - 1) * itemsPerPage, page * itemsPerPage)
  }, [data, page, itemsPerPage])

  useEffect(() => {
    onSetRows?.(paginatedData)
  }, [paginatedData])

  return (
    <>
      {children({ paginatedData, totalPages, page, itemsPerPage, setPage, setItemsPerPage })}
      {isLoading && <Loader className={styles.loader} />}
      {!paginatedData.length && !isLoading && (
        <ResponsesNothingFound
          className={styles.noData}
          size="m"
          actions={[]}
          description="Попробуйте изменить условия фильтра"
        />
      )}
      {!!paginatedData.length && !isLoading && (
        <div className={`${styles.pagination} ${props.paginationClass}`}>
          <Pagination
            items={totalPages}
            value={page}
            onChange={setPage}
            showFirstPage
            showLastPage
            visibleCount={visiblePagCount}
            className={styles.paginationComponent}
            outerMostArrows={[true, true]}
            arrows={[true, true]}
            size="s"
            getItemAs={() => 'div'}
          />
          <ItemsPerPageSelect itemsPerPage={itemsPerPage} setItemsPerPage={setItemsPerPage} />
          <TableRowsCounter
            currentPageNumber={page}
            itemsPerPage={itemsPerPage}
            totalPages={totalPages}
            totalCount={data.length}
          />
        </div>
      )}
    </>
  )
}

export default PaginatedTable
