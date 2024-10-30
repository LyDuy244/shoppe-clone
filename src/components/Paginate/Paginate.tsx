import classNames from 'classnames'
import { QueryConfig } from 'src/hooks/useQueryConfigs'
import { createSearchParams, Link } from 'react-router-dom'
import path from 'src/constants/path'
interface Props {
  pageSize: number
  queryConfig: QueryConfig
}

const RANGE = 2
export default function Paginate({ pageSize, queryConfig }: Props) {
  const page = Number(queryConfig.page)
  const renderPagination = () => {
    let dotAfter = false
    let dotBefore = false
    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true
        return (
          <span key={index} className='bg-white rounded-sm px-3 py-2 shadow-sm mx-2 cursor-pointer border border-solid'>
            ...
          </span>
        )
      }
      return null
    }
    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true
        return (
          <span key={index} className='bg-white rounded-sm px-3 py-2 shadow-sm mx-2 cursor-pointer border border-solid'>
            ...
          </span>
        )
      }
      return null
    }
    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1
        if (page <= RANGE * 2 + 1 && pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
          return renderDotAfter(index)
        } else if (page >= RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
          if (pageNumber < page - RANGE && pageNumber > RANGE) {
            return renderDotBefore(index)
          } else if (pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
            return renderDotAfter(index)
          }
        } else if (page >= pageSize - RANGE * 2 && pageNumber > RANGE && pageNumber < page - RANGE) {
          return renderDotBefore(index)
        }
        return (
          <Link
            to={{
              pathname: path.home,
              search: createSearchParams({ ...queryConfig, page: pageNumber.toString() }).toString()
            }}
            key={index}
            className={classNames('bg-white rounded-sm px-3 py-2 shadow-sm mx-2 cursor-pointer border border-solid', {
              'border-cyan-500': pageNumber === page,
              'border-transparent': pageNumber !== page
            })}
          >
            {pageNumber}
          </Link>
        )
      })
  }
  return (
    <div className='flex items-center flex-wrap mt-6 justify-center'>
      {page === 1 ? (
        <span className='bg-white/60 rounded-sm px-3 py-2 shadow-sm mx-2 cursor-not-allowed border border-solid'>
          Prev
        </span>
      ) : (
        <Link
          to={{
            pathname: path.home,
            search: createSearchParams({ ...queryConfig, page: (page - 1).toString() }).toString()
          }}
          className='bg-white rounded-sm px-3 py-2 shadow-sm mx-2 cursor-pointer border border-solid'
        >
          Prev
        </Link>
      )}
      {renderPagination()}
      {pageSize === page ? (
        <span className='bg-white rounded-sm px-3 py-2 shadow-sm mx-2 cursor-not-allowed border border-solid'>
          Prev
        </span>
      ) : (
        <Link
          to={{
            pathname: path.home,
            search: createSearchParams({ ...queryConfig, page: (page + 1).toString() }).toString()
          }}
          className='bg-white/60 rounded-sm px-3 py-2 shadow-sm mx-2 cursor-pointer border border-solid'
        >
          Next
        </Link>
      )}
    </div>
  )
}
