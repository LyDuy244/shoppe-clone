import { useForm } from 'react-hook-form'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import { ProfileSchema } from 'src/pages/User/Profile/Profile'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useMutation } from '@tanstack/react-query'
import userApi from 'src/api/user.api'
import { toast } from 'react-toastify'
import omit from 'lodash/omit'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponseApi } from 'src/types/utils.type'
import { useTranslation } from 'react-i18next'

const schema = ProfileSchema.pick(['password', 'new_password', 'confirm_password'])
type FormData = yup.InferType<typeof schema>

export default function ChangePassword() {
  const { t } = useTranslation('profile')
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    reset
  } = useForm<FormData>({
    defaultValues: {
      confirm_password: '',
      new_password: '',
      password: ''
    },
    resolver: yupResolver(schema)
  })
  const updateProfileMutation = useMutation({
    mutationFn: userApi.updateProfile
  })
  const onSubmit = async (data: FormData) => {
    try {
      const res = await updateProfileMutation.mutateAsync(omit(data, ['confirm_password']), {
        onSuccess: () => {
          reset()
        }
      })
      toast.success(res.data.message)
    } catch (error) {
      console.log(error)
      if (isAxiosUnprocessableEntityError<ErrorResponseApi<FormData>>(error)) {
        const formError = error.response?.data.data
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormData, {
              message: formError[key as keyof FormData],
              type: 'Server'
            })
          })
        }
      }
    }
  }

  return (
    <div className='rounded-sm bg-white px-2 md:px-7 pb-20 shadow-sm'>
      <div className='border-b-gray-200 py-6 border-solid border-b'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>{t('change password.title')}</h1>
        <div className='mt-1 text-sm text-gray-700'>{t('profile.description')}</div>
        <form className='mt-8 mr-auto max-w-2xl' onSubmit={handleSubmit(onSubmit)}>
          <div className='mt-6 flex-grow md:pr-12 md:mt-0'>
            <div className='mt-2 flex flex-wrap  flex-col sm:flex-row'>
              <div className='sm:w-[20%] truncate pt-3 sm:text-right capitalize'>
                {t('change password.old password')}
              </div>
              <div className='sm:w-[80%] sm:pl-5'>
                <Input
                  classNameInput=' px-3 py-2 w-full outline-none border border-solid border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                  className='relative'
                  register={register}
                  name='password'
                  errorMessage={errors.password?.message}
                  placeholder={t('change password.old password')}
                  type='password'
                />
              </div>
            </div>
            <div className='mt-2 flex flex-wrap  flex-col sm:flex-row'>
              <div className='sm:w-[20%] truncate pt-3 sm:text-right capitalize'>
                {t('change password.new password')}
              </div>
              <div className='sm:w-[80%] sm:pl-5'>
                <Input
                  classNameInput=' px-3 py-2 w-full outline-none border border-solid border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                  className='relative'
                  register={register}
                  name='new_password'
                  errorMessage={errors.new_password?.message}
                  placeholder={t('change password.new password')}
                  type='password'
                />
              </div>
            </div>
            <div className='mt-2 flex flex-wrap  flex-col sm:flex-row'>
              <div className='sm:w-[20%] truncate pt-3 sm:text-right capitalize'>
                {t('change password.confirm password')}
              </div>
              <div className='sm:w-[80%] sm:pl-5'>
                <Input
                  classNameInput=' px-3 py-2 w-full outline-none border border-solid border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                  className='relative'
                  register={register}
                  name='confirm_password'
                  errorMessage={errors.confirm_password?.message}
                  placeholder={t('change password.confirm password')}
                  type='password'
                />
              </div>
            </div>
            <div className='mt-4 flex flex-wrap  flex-col sm:flex-row'>
              <div className='sm:w-[20%] truncate pt-3 sm:text-right capitalize'></div>
              <div className='sm:w-[80%] sm:pl-5'>
                <Button
                  type='submit'
                  className='flex items-center h-9 bg-orange px-5 text-center text-sm text-white hover:bg-orange/80'
                >
                  Lưu
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
