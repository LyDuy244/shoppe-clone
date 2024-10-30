import { useForm } from 'react-hook-form'
import useQueryConfigs from 'src/hooks/useQueryConfigs'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { createSearchParams, useNavigate } from 'react-router-dom'
import omit from 'lodash/omit'
import path from 'src/constants/path'

const schema = yup
  .object({
    search: yup.string().trim().required()
  })
  .required()
type FormData = yup.InferType<typeof schema>
export default function useSearchProducts() {
  const queryConfig = useQueryConfigs()
  const navigate = useNavigate()
  const { handleSubmit, register } = useForm<FormData>({
    defaultValues: {
      search: ''
    },
    resolver: yupResolver(schema)
  })
  const onSubmitSearch = (data: FormData) => {
    const config = queryConfig.order
      ? omit({ ...queryConfig, name: data.search }, ['order', 'sort_by'])
      : { ...queryConfig, name: data.search }
    navigate({
      pathname: path.home,
      search: createSearchParams(config).toString()
    })
  }
  return {
    handleSubmit,
    register,
    onSubmitSearch
  }
}
