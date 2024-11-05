import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useContext, useEffect, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import purchasesApi from 'src/api/purchase.api'
import Button from 'src/components/Button'
import QuantityController from 'src/components/QuantityController'
import { purchasesStatus } from 'src/constants/purchase'
import { Purchase } from 'src/types/purchase.type'
import { formatCurrency, generateNameId } from 'src/utils/utils'
import { produce } from 'immer'
import keyBy from 'lodash/keyBy'
import { toast } from 'react-toastify'
import { AppContext } from 'src/context/app.context'
import noproduct from 'src/assets/images/no-product.png'
import path from 'src/constants/path'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

export default function Cart() {
  const { t } = useTranslation('cart')
  const { extendedPurchase, setExtendedPurchase } = useContext(AppContext)
  const location = useLocation()
  const choosenPurchaseIdFromLocation = (location.state as { purchaseId: string | null })?.purchaseId
  const { data: purchasesInCartData, refetch } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => purchasesApi.getPurchaseList({ status: purchasesStatus.inCart })
  })

  const updatePurchaseMutation = useMutation({
    mutationFn: purchasesApi.updatePurchase,
    onSuccess: () => {
      refetch()
    }
  })

  const deletePurchaseMutation = useMutation({
    mutationFn: purchasesApi.deletePurchase,
    onSuccess: (data) => {
      refetch()
      toast.success(data.data.message, {
        position: 'top-center',
        autoClose: 1000
      })
    }
  })

  const buyProductMutation = useMutation({
    mutationFn: purchasesApi.buyProducts,
    onSuccess: (data) => {
      refetch()
      toast.success(data.data.message, {
        position: 'top-center',
        autoClose: 1000
      })
    }
  })

  const purchasesInCart = purchasesInCartData?.data.data
  const isAllChecked = useMemo(
    () => (extendedPurchase.length > 0 && extendedPurchase.every((purchase) => purchase.checked === true)) || false,
    [extendedPurchase]
  )
  const checkedPurchases = useMemo(
    () => extendedPurchase.filter((purchase) => purchase.checked === true),
    [extendedPurchase]
  )
  const checkedPurchasesCount = checkedPurchases.length
  const totalCheckedPurchasePrice = useMemo(
    () =>
      checkedPurchases.reduce((result, purchase) => {
        return result + purchase.buy_count * purchase.price
      }, 0),
    [checkedPurchases]
  )
  const totalCheckedPurchaseSavingPrice = useMemo(
    () =>
      checkedPurchases.reduce((result, purchase) => {
        return result + (purchase.price_before_discount - purchase.price) * purchase.buy_count
      }, 0),
    [checkedPurchases]
  )

  useEffect(() => {
    if (purchasesInCart) {
      setExtendedPurchase((prev) => {
        const extendedPurchasesObject = keyBy(prev, '_id')
        return (
          purchasesInCart.map((purchase) => {
            const isChoosenPurchaseFromLocation = choosenPurchaseIdFromLocation === purchase._id
            return {
              ...purchase,
              disabled: false,
              checked: isChoosenPurchaseFromLocation || Boolean(extendedPurchasesObject[purchase._id]?.checked)
            }
          }) || []
        )
      })
    }
  }, [choosenPurchaseIdFromLocation, purchasesInCart, setExtendedPurchase])

  useEffect(() => {
    return () => {
      history.replaceState(null, '')
    }
  }, [])

  const handleChecked = (purchaseIndex: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurchase(
      produce((draft) => {
        draft[purchaseIndex].checked = e.target.checked
      })
    )
  }

  const handleCheckAll = () => {
    setExtendedPurchase(produce((prev) => prev.map((purchase) => ({ ...purchase, checked: !isAllChecked }))))
  }

  const handleQuantity = (purchaseIndex: number, value: number, enabled: boolean) => {
    if (enabled) {
      const purchase = extendedPurchase[purchaseIndex]
      setExtendedPurchase(
        produce((draft) => {
          draft[purchaseIndex].disabled = true
        })
      )
      updatePurchaseMutation.mutate({ product_id: purchase.product._id, buy_count: value })
    }
  }
  const handelTypeQuantity = (purchaseIndex: number) => (value: number) => {
    setExtendedPurchase(
      produce((draft) => {
        draft[purchaseIndex].buy_count = value
      })
    )
  }
  const handleDelete = (purchaseIndex: number) => {
    const purchaseId = extendedPurchase[purchaseIndex]._id
    deletePurchaseMutation.mutate([purchaseId])
  }

  const handleDeleteManyPurchase = () => {
    if (checkedPurchasesCount > 0) {
      const purchaseIds = checkedPurchases.map((purchase) => purchase._id)
      deletePurchaseMutation.mutate(purchaseIds)
    }
  }

  const handleBuyProduct = () => {
    if (checkedPurchasesCount) {
      const body = checkedPurchases.map((purchase) => ({
        product_id: purchase.product._id,
        buy_count: purchase.buy_count
      }))
      buyProductMutation.mutate(body)
    }
  }

  return (
    <div className='bg-neutral-100 py-16'>
      <Helmet>
        <title>Giỏ hàng | Shoppe Clone</title>
        <meta name='description' content='Trang giỏ hàng của dự án shoppe clone' />
      </Helmet>
      <div className='container'>
        {extendedPurchase.length > 0 ? (
          <>
            <div className='overflow-auto'>
              <div className='min-w-[1000px] '>
                <div className='grid grid-cols-12 rounded-sm bg-white py-5 px-9 text-sm capitalize text-gray-500 shadow-sm'>
                  <div className='col-span-6'>
                    <div className='flex items-center'>
                      <div className='flex items-center flex-shrink-0 justify-center pr-3'>
                        <input
                          type='checkbox'
                          className='h-5 w-5 accent-orange'
                          checked={isAllChecked}
                          onChange={handleCheckAll}
                        />
                      </div>
                      <div className='flex-grow text-black'>{t('product')}</div>
                    </div>
                  </div>
                  <div className='col-span-6'>
                    <div className='grid grid-cols-5 text-center'>
                      <div className='col-span-2'>{t('unit price')}</div>
                      <div className='col-span-1'>{t('quantity')}</div>
                      <div className='col-span-1'>{t('total price')}</div>
                      <div className='col-span-1'>{t('actions')}</div>
                    </div>
                  </div>
                </div>
                {extendedPurchase.length > 0 && (
                  <div className='my-3 rounded-sm bg-white p-5 shadow-sm'>
                    {extendedPurchase.map((purchase, index) => (
                      <div
                        key={purchase._id}
                        className='grid grid-cols-12 items-center text-center rounded-sm border border-solid border-gray-200 py-5 px-4 bg-white text-sm text-gray-500 first:mt-0 mt-5'
                      >
                        <div className='col-span-6'>
                          <div className='flex'>
                            <div className='flex items-center flex-shrink-0 justify-center pr-3'>
                              <input
                                type='checkbox'
                                className='h-5 w-5 accent-orange'
                                checked={purchase.checked}
                                onChange={handleChecked(index)}
                              />
                            </div>
                            <div className='flex-grow '>
                              <div className='flex'>
                                <Link
                                  to={`/${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`}
                                  className='h-20 w-20 flex-shrink-0'
                                >
                                  <img src={purchase.product.image} alt={purchase.product.name} />
                                </Link>
                                <div className='flex-grow px-2 pt-1 pb-2'>
                                  <Link
                                    to={`/${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`}
                                    className='line-clamp-2 text-left'
                                  >
                                    {purchase.product.name}
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='col-span-6'>
                          <div className='grid grid-cols-5 items-center'>
                            <div className='col-span-2'>
                              <div className='flex items-center justify-center'>
                                <span className='text-gray-300 line-through'>
                                  ₫{formatCurrency(purchase.product.price_before_discount)}
                                </span>
                                <span className='ml-3'>₫{formatCurrency(purchase.product.price)}</span>
                              </div>
                            </div>
                            <div className='col-span-1'>
                              <QuantityController
                                max={purchase.product.quantity}
                                value={purchase.buy_count}
                                classNameWrapper='flex items-center'
                                onIncrease={(value) => handleQuantity(index, value, value < purchase.product.quantity)}
                                onDecrease={(value) => handleQuantity(index, value, value > 1)}
                                onFocusOut={(value) =>
                                  handleQuantity(
                                    index,
                                    value,
                                    value >= 1 &&
                                      value <= purchase.product.quantity &&
                                      value !== (purchasesInCart as Purchase[])[index].buy_count
                                  )
                                }
                                onType={handelTypeQuantity(index)}
                                disabled={purchase.disabled}
                              ></QuantityController>
                            </div>
                            <div className='col-span-1'>
                              <span className='text-orange'>
                                ₫{formatCurrency(purchase.product.price * purchase.buy_count)}
                              </span>
                            </div>
                            <div className='col-span-1'>
                              <button
                                className='bg-none text-black transition-colors hover:text-orange'
                                onClick={() => handleDelete(index)}
                              >
                                {t('delete')}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className='sticky bottom-0 z-10 flex flex-col sm:flex-row sm:items-center rounded-sm bg-white p-5 shadow-sm border-gray-100 mt-10'>
              <div className='flex items-center'>
                <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                  <input
                    type='checkbox'
                    className='h-5 w-5 accent-orange'
                    checked={isAllChecked}
                    onChange={handleCheckAll}
                  />
                </div>
                <button className='mx-3 border-none bg-none' onClick={handleCheckAll}>
                  {t('select all')} ({extendedPurchase.length})
                </button>
                <button className='mx-3 border-none bg-none' onClick={handleDeleteManyPurchase}>
                  {t('delete')}
                </button>
              </div>
              <div className='sm:ml-auto flex flex-col sm:flex-row sm:items-center mt-5 sm:mt-0'>
                <div>
                  <div className='flex items-center sm:justify-end'>
                    <div>
                      {t('total')} ({checkedPurchasesCount} {t('product')})
                    </div>
                    <div className='ml-2 text-2xl text-orange'>₫{formatCurrency(totalCheckedPurchasePrice)}</div>
                  </div>
                  {totalCheckedPurchaseSavingPrice > 0 && (
                    <div className='flex items-center sm:justify-end text-sm'>
                      <div className='text-gray-500'>{t('saved')}</div>
                      <div className='ml-6 text-orange'>₫{formatCurrency(totalCheckedPurchaseSavingPrice)}</div>
                    </div>
                  )}
                </div>
                <Button
                  className='h-10 w-52  mt-5 sm:mt-0 text-center sm:ml-4 uppercase bg-red-500 text-white text-sm hover:bg-red-600'
                  onClick={handleBuyProduct}
                  disabled={buyProductMutation.isPending}
                >
                  {t('check out')}
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className='text-center'>
            <img src={noproduct} alt={'no purchase'} className='w-40 h-40 object-cover mx-auto' />
            <div className='font-bold text-gray-500  mt-5'>{t("empty cart")}</div>
            <div className='text-center mt-5'>
              <Link
                to={path.home}
                className=' bg-orange px-10 rounded-sm py-2 hover:bg-orange/80 transition-all uppercase text-white'
              >
                {t("buy now")}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
