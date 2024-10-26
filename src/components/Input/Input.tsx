import React, { InputHTMLAttributes } from 'react'
import { UseFormRegister } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
  className?: string
  register?: UseFormRegister<any>
}

export default function Input({
  type,
  errorMessage,
  name,
  placeholder,
  register,
  classNameInput = `p-3 w-full outline-none border border-solid border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm `,
  classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-sm',
  className
}: Props) {
  const registerResult = register && name ? register(name) : {}
  return (
    <div className={`mt-2 ${className}`}>
      <input type={type} className={classNameInput} placeholder={placeholder} {...registerResult} autoComplete='on' />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}
