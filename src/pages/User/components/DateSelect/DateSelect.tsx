import range from 'lodash/range'

import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
  onChange?: (value: Date) => void
  value?: Date
  errorMessage?: string
}

export default function DateSelect({ errorMessage, onChange, value }: Props) {
  const {t} = useTranslation("profile")
  const [date, setDate] = useState({
    date: value?.getDate() || 1,
    month: value?.getMonth() || 0,
    year: value?.getFullYear() || 1990
  })
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target
    const newDate = {
      ...date,
      [name]: Number(value)
    }
    setDate(newDate)
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    onChange && onChange(new Date(newDate.year, newDate.month, newDate.date))
  }

  useEffect(() => {
    if (value) {
      setDate({ date: value.getDate(), month: value.getMonth(), year: value.getFullYear() })
    }
  }, [value])

  return (
    <div className='mt-2 flex flex-wrap  flex-col sm:flex-row'>
      <div className='sm:w-[20%] truncate pt-3 sm:text-right capitalize'>{t('profile.form.birth day')}</div>
      <div className='sm:w-[80%] sm:pl-5'>
        <div className='flex justify-between'>
          <select
            onChange={handleChange}
            name='date'
            value={value?.getDate() || date.date}
            className='h-10 w-[32%] border border-solid border-black/10 px-3 hover:border-orange cursor-pointer outline-none'
          >
            <option value={''} disabled>
              Ngày
            </option>
            {range(1, 32).map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
          <select
            name='month'
            onChange={handleChange}
            value={value?.getMonth() || date.month}
            className='h-10 w-[32%] border border-solid border-black/10 px-3 hover:border-orange cursor-pointer outline-none'
          >
            <option value={''} disabled>
              Tháng
            </option>
            {range(0, 12).map((item) => (
              <option value={item} key={item}>
                {item + 1}
              </option>
            ))}
          </select>
          <select
            name='year'
            onChange={handleChange}
            value={value?.getFullYear() || date.year}
            className='h-10 w-[32%] border border-solid border-black/10 px-3 hover:border-orange cursor-pointer outline-none'
          >
            <option value={''} disabled>
              Năm
            </option>
            {range(1910, new Date().getFullYear() + 1).map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className={'mt-1 text-red-600 min-h-[1.25rem] text-sm'}>{errorMessage}</div>
      </div>
    </div>
  )
}
