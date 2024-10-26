import React, { forwardRef, InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
  className?: string
}

const InputNumber = forwardRef<HTMLInputElement, Props>(function InputNumberInner(
  {
    errorMessage,
    className,
    classNameInput = `p-3 w-full outline-none border border-solid border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm `,
    classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-sm',
    onChange,
    ...rest
  }: Props,
  ref
) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if ((/^\d+$/.test(value) || value === '') && onChange) {
      onChange(e)
    }
  }
  return (
    <div className={`mt-2 ${className}`}>
      <input className={classNameInput} {...rest} onChange={handleChange} ref={ref} />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
})

export default InputNumber
