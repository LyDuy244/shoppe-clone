import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { createSearchParams, Link } from 'react-router-dom'
import purchasesApi from 'src/api/purchase.api'
import path from 'src/constants/path'
import { purchasesStatus } from 'src/constants/purchase'
import useQueryParams from 'src/hooks/useQueryParams'
import { PurchaseListStatus } from 'src/types/purchase.type'
import { formatCurrency, generateNameId } from 'src/utils/utils'

export default function HistoryPurchase() {
  const { t } = useTranslation('profile')
  const queryParams: { status?: string } = useQueryParams()
  const status: number = Number(queryParams.status) || purchasesStatus.all
  const { data: purchasesInCartData } = useQuery({
    queryKey: ['purchases', { status }],
    queryFn: () => purchasesApi.getPurchaseList({ status: status as PurchaseListStatus })
  })
  const purchasesInCart = purchasesInCartData?.data.data

  const purchaseTabs = useMemo(
    () => [
      { status: purchasesStatus.all, name: t('purchase.all') },
      {
        status: purchasesStatus.waitForConfirmation,
        name: t('purchase.to pay')
      },
      {
        status: purchasesStatus.waiForGetting,
        name: t('purchase.to receive')
      },
      {
        status: purchasesStatus.inProgress,
        name: t('purchase.to receive')
      },
      {
        status: purchasesStatus.delivered,
        name: t('purchase.completed')
      },
      {
        status: purchasesStatus.cancelled,
        name: t('purchase.cancelled')
      }
    ],
    [t]
  )

  return (
    <div>
      <div className='overflow-x-auto'>
        <div className='min-w-[700px]'>
          <div className='sticky top-0 flex rounded-t-sm shadow-sm'>
            {purchaseTabs.map((purchase) => (
              <Link
                key={purchase.name}
                to={{
                  pathname: path.historyPurchase,
                  search: createSearchParams({
                    status: purchase.status.toString()
                  }).toString()
                }}
                className={classNames(
                  'flex flex-1 items-center justify-center bg-white border-b-2 border-solid py-4 text-center',
                  {
                    'border-b-orange text-orange': status === purchase.status,
                    'border-b-black/10 text-gray-900': status !== purchase.status
                  }
                )}
              >
                {purchase.name}
              </Link>
            ))}
          </div>
          <div>
            {purchasesInCart?.map((purchase) => (
              <div
                key={purchase._id}
                className='mt-4 rounded-sm border border-solid border-black/10 bg-white p-6 text-gray-800 shadow-sm'
              >
                <Link
                  to={`/${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`}
                  className='flex'
                >
                  <div className='flex-shrink-0'>
                    <img src={purchase.product.image} className='h-20 w-20 object-cover' alt={purchase.product.name} />
                  </div>

                  <div className='ml-3 flex-grow overflow-hidden'>
                    <div className='truncate'>{purchase.product.name}</div>
                    <div className='mt-3'>x{purchase.buy_count}</div>
                  </div>
                  <div className='ml-3 flex-shrink-0'>
                    <span className='truncate text-gray-500 line-through'>
                      ₫{formatCurrency(purchase.price_before_discount)}
                    </span>
                    <span className='truncate text-orange ml-2'>₫{formatCurrency(purchase.price)}</span>
                  </div>
                </Link>
                <div className='flex justify-end'>
                  <div>
                    <span>{t("purchase.order total")}:</span>
                    <span className='ml-4 text-xl text-orange'>
                      ₫{formatCurrency(purchase.price * purchase.buy_count)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
