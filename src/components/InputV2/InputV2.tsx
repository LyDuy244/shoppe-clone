import React, { forwardRef, InputHTMLAttributes, useState } from 'react'
import { FieldValues, useController, UseControllerProps, FieldPath } from 'react-hook-form'

export type InputNumberProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  classNameInput?: string
  classNameError?: string
} & InputHTMLAttributes<HTMLInputElement> &
  UseControllerProps<TFieldValues, TName>

const InputV2 = function InputNumberInner<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: InputNumberProps<TFieldValues, TName>) {
  const { type, onChange, className, classNameError, classNameInput, value, ...rest } = props
  const { field, fieldState } = useController(props)
  const [localValue, setLocalValue] = useState<string>(field.value)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valueFromInput = e.target.value
    const numberCondition = type === 'number' && (/^\d+$/.test(valueFromInput) || valueFromInput === '')
    if (numberCondition || type !== 'number') {
      // Cập nhật local value state
      setLocalValue(valueFromInput)
      // Gọi field.onChange để cập nhật state trong React hook form
      field.onChange(e)

      // Thực thi onChange callback  từ bên ngoài truyền vào props
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      onChange && onChange(e)
    }
  }
  return (
    <div className={`${className}`}>
      <input className={classNameInput} {...rest} {...field} value={value || localValue} onChange={handleChange} />
      <div className={classNameError}>{fieldState.error?.message}</div>
    </div>
  )
}

export default InputV2
