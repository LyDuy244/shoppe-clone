import React from 'react'
import { Link } from 'react-router-dom'
import path from 'src/constants/path'
import { Product as ProductType } from 'src/types/product.type'
import { formatCurrency, formatNumberToSocialStyle } from 'src/utils/utils'

interface Props {
  product: ProductType
}

export default function Product({ product }: Props) {
  return (
    <Link to='/'>
      <div className='bg-white shadow-md rounded-sm hover:translate-y-[-0.03rem] hover:shadow-lg duration-100 transition-transform overflow-hidden'>
        <div className='w-full pt-[100%] relative'>
          <img
            src={product.image}
            alt={product.name}
            className='absolute top-0 left-0 bg-white w-full h-full object-cover'
          />
        </div>
        <div className='p-2 py-4 overflow-hidden'>
          <div className='min-h-[2rem] line-clamp-2 text-xs'>{product.name}</div>
          <div className='flex items-center mt-3 text-sm'>
            <div className='line-through max-w-[50%] text-gray-500 truncate'>
              <span className='text-xs'>₫</span>
              <span className='text-sm'>{formatCurrency(product.price_before_discount)}</span>
            </div>
            <div className='text-orange truncate ml-2'>
              <span className='text-xs'>₫</span>
              <span className='text-sm'>{formatCurrency(product.price)}</span>
            </div>
          </div>
          <div className='mt-3 flex items-center'>
            <div className='flex items-center gap-1'>
              <img
                src='https://deo.shopeemobile.com/shopee/modules-federation/live/0/shopee__item-card-standard-v2/0.1.36/pc/d7099d3fd1dfdaf705ab.svg'
                width='10'
                height='10'
                alt='rating-star-full'
              />
              <span className='text-xs'>{product.rating}</span>
            </div>
            <div className='ml-2 text-xs'>
              <span>{formatNumberToSocialStyle(product.sold)}</span>
              <span className='ml-1'>Đã bán</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
