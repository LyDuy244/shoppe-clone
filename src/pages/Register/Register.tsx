import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Input from 'src/components/Input'
import { useMutation } from '@tanstack/react-query'
import authApi from 'src/api/auth.api'
import omit from 'lodash/omit'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponseApi } from 'src/types/utils.type'
import { useContext } from 'react'
import { AppContext } from 'src/context/app.context'
import Button from 'src/components/Button'
import { Helmet } from 'react-helmet-async'

const schema = yup
  .object({
    email: yup
      .string()
      .required('Bạn phải nhập vào Email')
      .max(160, 'Đô dài từ 5 - 160 ký tự')
      .min(5, 'Đô dài từ 5 - 160 ký tự')
      .email('Email không đúng định dạng'),
    password: yup
      .string()
      .required('Bạn phải nhập vào Password')
      .max(160, 'Đô dài từ 6 - 160 ký tự')
      .min(6, 'Đô dài từ 6 - 160 ký tự'),
    confirm_password: yup
      .string()
      .required('Bạn phải nhập vào Confirm Password')
      .min(6, 'Đô dài từ 6 - 160 ký tự')
      .max(160, 'Đô dài từ 6 - 160 ký tự')
      .test('passwords-match', 'Nhập lại Password không khớp', function (value) {
        return this.parent.password === value
      })
  })
  .required()

type FormData = yup.InferType<typeof schema>

const Register = () => {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    mode: 'onChange',
    resolver: yupResolver(schema)
  })
  const registerMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.registerAccount(body)
  })

  const onSubmit = (data: FormData) => {
    const body = omit(data, ['confirm_password'])
    registerMutation.mutate(body, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        navigate('/')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponseApi<Omit<FormData, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<FormData, 'confirm_password'>, {
                message: formError[key as keyof Omit<FormData, 'confirm_password'>],
                type: 'Server'
              })
            })
          }
        }
      }
    })
  }
  return (
    <div className='bg-orange'>
      <Helmet>
        <title>Trang Đăng ký | Shoppe Clone</title>
        <meta name='description' content='Đăng ký tài khoản của dự án shoppe clone' />
      </Helmet>
      <div className='container'>
        <div className='grid grid-cols-1 lg:grid-cols-5 lg:py-32 lg:pr-10 py-12'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm' onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className='text-2xl'>Đăng ký</div>
              <Input
                type='email'
                register={register}
                name='email'
                errorMessage={errors?.email?.message}
                placeholder='Email'
              ></Input>
              <Input
                type='password'
                className='relative'
                classNameEye='size-5 cursor-pointer absolute top-[12px] right-[8px]'
                register={register}
                name='password'
                errorMessage={errors?.password?.message}
                placeholder='Password'
              ></Input>
              <Input
                type='password'
                className='relative'
                classNameEye='size-5 cursor-pointer absolute top-[12px] right-[8px]'
                register={register}
                name='confirm_password'
                errorMessage={errors?.confirm_password?.message}
                placeholder='Confirm Password'
              ></Input>

              <div className='mt-2'>
                <Button
                  isLoading={registerMutation.isPending}
                  disabled={registerMutation.isPending}
                  className='w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600'
                >
                  Đăng nhập
                </Button>
              </div>
              <div className='mt-8 text-center'>
                <div className='flex items-center justify-center'>
                  <span className='text-gray-400'>
                    Bạn đã có tài khoản?
                    <Link className='text-red-400 ml-1' to={'/login'}>
                      Đăng nhập
                    </Link>
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
