import classNames from 'classnames'
import { Controller, Resolver, useForm } from 'react-hook-form'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import Button from 'src/components/Button'
import path from 'src/constants/path'
import { Category } from 'src/types/category.type'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import omit from 'lodash/omit'
import { NoUndefinedField } from 'src/types/utils.type'
import RatingStart from 'src/pages/ProductList/components/RatingStart'
import { QueryConfig } from 'src/hooks/useQueryConfigs'
import { useTranslation } from 'react-i18next'
import Skeleton from 'src/components/Skeleton'
import InputNumber from 'src/components/InputNumber'

interface Props {
  categories: Category[]
  queryConfig: QueryConfig
}

const schema = yup
  .object({
    price_min: yup.string().test({
      name: 'price-not-allowed',
      message: 'Giá không phù hợp',
      test: function (value) {
        const price_min = value
        const { price_max } = this.parent as { price_min: string; price_max: string }
        if (price_min !== '' && price_max !== '') {
          return Number(price_max) >= Number(price_min)
        }
        return price_min !== '' || price_max !== ''
      }
    }),
    price_max: yup.string().test({
      name: 'price-not-allowed',
      message: 'Giá không phù hợp',
      test: function (value) {
        const price_max = value
        const { price_min } = this.parent as { price_min: string; price_max: string }
        if (price_min !== '' && price_max !== '') {
          return Number(price_max) >= Number(price_min)
        }
        return price_min !== '' || price_max !== ''
      }
    })
  })
  .required()

type FormData = NoUndefinedField<yup.InferType<typeof schema>>

export default function AsideFilter({ categories, queryConfig }: Props) {
  const { t } = useTranslation()
  const { category } = queryConfig
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
    reset
  } = useForm<FormData>({
    defaultValues: {
      price_max: '',
      price_min: ''
    },
    resolver: yupResolver(schema) as Resolver<FormData>,
    shouldFocusError: false
  })
  const navigate = useNavigate()

  const onSubmit = (data: FormData) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({ ...queryConfig, price_min: data.price_min, price_max: data.price_max }).toString()
    })
  }
  const handleRemoveAll = () => {
    navigate({
      pathname: path.home,
      search: createSearchParams(omit(queryConfig, ['price_min', 'price_max', 'category', 'rating_filter'])).toString()
    })
    reset({
      price_max: '',
      price_min: ''
    })
  }

  return (
    <div className='py-4'>
      <Link
        to={path.home}
        className={classNames('flex items-center font-bold', {
          'text-orange': !category
        })}
      >
        <svg viewBox='0 0 12 10' className='w-4 h-4 mr-3 fill-current'>
          <g fillRule='evenodd' stroke='none' strokeWidth='1'>
            <g transform='translate(-373 -208)'>
              <g transform='translate(155 191)'>
                <g transform='translate(218 17)'>
                  <path d='m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z'></path>
                  <path d='m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z'></path>
                  <path d='m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z'></path>
                </g>
              </g>
            </g>
          </g>
        </svg>
        {t('aside filter.all categories')}
      </Link>
      <div className='bg-gray-300 h-[1px] my-4'></div>
      <ul>
        {categories.length > 0
          ? categories.map((categoryItem) => {
              const isActive = category === categoryItem._id

              return (
                <li className='py-2 pl-2' key={categoryItem._id}>
                  <Link
                    to={{
                      pathname: path.home,
                      search: createSearchParams({ ...queryConfig, category: categoryItem._id }).toString()
                    }}
                    className={classNames('relative px-2 ', {
                      'text-orange font-semibold': isActive
                    })}
                  >
                    {isActive && (
                      <svg viewBox='0 0 4 7' className='fill-orange h-2 w-2 absolute top-1 left-[-10px]'>
                        <polygon points='4 3.5 0 0 0 7'></polygon>
                      </svg>
                    )}
                    {categoryItem.name}
                  </Link>
                </li>
              )
            })
          : Array(3)
              .fill(0)
              .map((_, index) => (
                <Skeleton key={index} height='20px' width='80%' className='bg-white mt-3 rounded-lg'></Skeleton>
              ))}
      </ul>
      <Link to={path.home} className='flex items-center font-bold mt-4 uppercase'>
        <svg
          enableBackground='new 0 0 15 15'
          viewBox='0 0 15 15'
          x='0'
          y='0'
          className='w-3 h-4 fill-current stroke-current mr-3'
        >
          <g>
            <polyline
              fill='none'
              points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeMiterlimit='10'
            ></polyline>
          </g>
        </svg>
        {t('aside filter.filter search')}
      </Link>
      <div className='bg-gray-300 h-[1px] my-4'></div>
      <div className='my-5'>
        <div> {t('aside filter.price range')}</div>
        <form className='mt-2' onSubmit={handleSubmit(onSubmit)}>
          <div className='flex items-start'>
            <Controller
              control={control}
              name='price_min'
              render={({ field }) => {
                return (
                  <InputNumber
                    type='text'
                    className='grow mt-2'
                    classNameInput='p-1 w-full outline-none border border-solid border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                    placeholder={`₫ ${t('aside filter.price min')}`}
                    classNameError='hidden'
                    {...field}
                    onChange={(event) => {
                      field.onChange(event)
                      trigger('price_max')
                    }}
                  />
                )
              }}
            ></Controller>
            <div className='mx-2 mt-3 shrink-0'>-</div>
            <Controller
              control={control}
              name='price_max'
              render={({ field }) => {
                return (
                  <InputNumber
                    type='text'
                    className='grow mt-2'
                    classNameInput='p-1 w-full outline-none border border-solid border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                    placeholder={`₫ ${t('aside filter.price max')}`}
                    classNameError='hidden'
                    {...field}
                    onChange={(event) => {
                      field.onChange(event)
                      trigger('price_min')
                    }}
                  />
                )
              }}
            ></Controller>
          </div>
          <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm text-center'>
            {errors.price_min?.message || errors.price_max?.message}
          </div>
          <Button className='w-full p-2 uppercase bg-orange text-white text-sm hover:bg-orange/80 flex justify-center items-center'>
            {t('aside filter.apply')}
          </Button>
        </form>
      </div>
      <div className='bg-gray-300 h-[1px] my-4'></div>
      <div className='text-sm'>{t('aside filter.rating')}</div>
      <RatingStart queryConfig={queryConfig}></RatingStart>
      <div className='bg-gray-300 h-[1px] my-4'></div>
      <Button
        className='w-full p-2 uppercase bg-orange text-white text-sm hover:bg-orange/80 flex justify-center items-center'
        onClick={handleRemoveAll}
      >
        {t('aside filter.clear all')}
      </Button>
    </div>
  )
}
