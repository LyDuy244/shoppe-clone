import { useContext, useEffect, useMemo, useState } from 'react'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Controller, FormProvider, useForm, useFormContext } from 'react-hook-form'
import { useMutation, useQuery } from '@tanstack/react-query'
import userApi from 'src/api/user.api'
import DateSelect from 'src/pages/User/components/DateSelect'
import InputNumber from 'src/components/InputNumber'
import { toast } from 'react-toastify'
import { AppContext } from 'src/context/app.context'
import userImage from 'src/assets/images/user-image.png'
import { setProfileToLocalStorage } from 'src/utils/auth'
import { getAvatarUrl, isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponseApi } from 'src/types/utils.type'
import InputFile from 'src/components/InputFile'

export const ProfileSchema = yup
  .object({
    name: yup.string().min(5, 'Đô dài từ 5 - 160 ký tự').max(160, 'Đô dài từ 5 - 160 ký tự'),
    phone: yup.string().min(10, 'Đô dài từ 10 - 20 ký tự').max(20, 'Đô dài từ 10 - 20 ký tự'),
    address: yup.string().max(160, 'Đô dài từ 5 - 160 ký tự'),
    date_of_birth: yup.date().max(new Date(), 'Hãy chọn một ngày trong quá khứ'),
    password: yup
      .string()
      .required('Bạn phải nhập vào Password')
      .max(160, 'Đô dài từ 6 - 160 ký tự')
      .min(6, 'Đô dài từ 6 - 160 ký tự'),
    new_password: yup
      .string()
      .required('Bạn phải nhập vào Password mới')
      .max(160, 'Đô dài từ 6 - 160 ký tự')
      .min(6, 'Đô dài từ 6 - 160 ký tự'),
    confirm_password: yup
      .string()
      .required('Bạn phải nhập vào Confirm Password')
      .min(6, 'Đô dài từ 6 - 160 ký tự')
      .max(160, 'Đô dài từ 6 - 160 ký tự')
      .test('passwords-match', 'Nhập lại Password không khớp', function (value) {
        return this.parent.new_password === value
      }),
    avatar: yup.string().max(1000, 'Đô dài tối đa 1000 ký tự')
  })
  .required()

const schema = ProfileSchema.pick(['name', 'address', 'phone', 'date_of_birth', 'avatar'])
type FormData = yup.InferType<typeof schema>
type FormDataError = Omit<FormData, 'date_of_birth'> & {
  date_of_birth: string
}

export default function Profile() {
  const method = useForm<FormData>({
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      avatar: '',
      date_of_birth: new Date(1990, 0, 1)
    },
    resolver: yupResolver(schema)
  })
  const {
    reset,
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
    setError
  } = method
  const { data: profileData, refetch } = useQuery({ queryKey: ['profile'], queryFn: userApi.getProfile })
  const profile = profileData?.data.data
  const updateProfileMutation = useMutation({
    mutationFn: userApi.updateProfile
  })
  const uploadAvatarMutation = useMutation({ mutationFn: userApi.uploadAvatar })
  const { setProfile } = useContext(AppContext)
  const [file, setFile] = useState<File>()
  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])
  const avatar = watch('avatar')

  useEffect(() => {
    if (profile) {
      reset({
        name: profile.name,
        address: profile.address,
        avatar: profile.avatar,
        phone: profile.phone
      })
      setValue('date_of_birth', profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(1990, 0, 1))
    }
  }, [profile, reset, setValue])

  const onSubmit = async (data: FormData) => {
    try {
      let avatarName = avatar
      if (file) {
        const form = new FormData()
        form.append('image', file)
        const uploadRes = await uploadAvatarMutation.mutateAsync(form)
        avatarName = uploadRes.data.data
        setValue('avatar', avatarName)
      }
      const res = await updateProfileMutation.mutateAsync({
        ...data,
        date_of_birth: data.date_of_birth ? data.date_of_birth.toISOString() : new Date(1990, 0, 1).toISOString(),
        avatar: avatarName
      })
      setProfile(res.data.data)
      setProfileToLocalStorage(res.data.data)
      refetch()
      toast.success(res.data.message)
    } catch (error) {
      console.log(error)
      if (isAxiosUnprocessableEntityError<ErrorResponseApi<FormDataError>>(error)) {
        const formError = error.response?.data.data
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormDataError, {
              message: formError[key as keyof FormDataError],
              type: 'Server'
            })
          })
        }
      }
    }
  }

  const handleChangeFile = (file?: File) => {
    setFile(file)
  }

  return (
    <div className='rounded-sm bg-white px-2 md:px-7 pb-20 shadow-sm'>
      <div className='border-b-gray-200 py-6 border-solid border-b'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>Hồ sơ của tôi</h1>
        <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
        <FormProvider {...method}>
          <form className='mt-8 flex flex-col-reverse md:flex-row md:items-start' onSubmit={handleSubmit(onSubmit)}>
            <div className='mt-6 flex-grow md:pr-12 md:mt-0'>
              <div className='flex flex-wrap flex-col sm:flex-row'>
                <div className='sm:w-[20%] truncate pt-3 sm:text-right capitalize'>Email</div>
                <div className='sm:w-[80%] sm:pl-5'>
                  <div className='pt-3 text-gray-700'>{profile?.email}</div>
                </div>
              </div>
              <Info></Info>
              <div className='mt-2 flex flex-wrap  flex-col sm:flex-row'>
                <div className='sm:w-[20%] truncate pt-3 sm:text-right capitalize'>Địa chỉ</div>
                <div className='sm:w-[80%] sm:pl-5'>
                  <Input
                    classNameInput='px-3 py-2 w-full outline-none border border-solid border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                    register={register}
                    name='address'
                    errorMessage={errors.address?.message}
                    placeholder='Địa chỉ'
                  />
                </div>
              </div>
              <Controller
                control={control}
                name='date_of_birth'
                render={({ field }) => (
                  <DateSelect
                    errorMessage={errors.date_of_birth?.message}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
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
            <div className='flex justify-center md:w-72 md:border-l md:border-solid md:border-l-gray-200'>
              <div className='flex flex-col items-center'>
                <div className='my-5 h-24 w-24'>
                  <img
                    src={previewImage || getAvatarUrl(avatar as string) || userImage}
                    className='w-full h-full rounded-full object-cover'
                    alt=''
                  />
                </div>

                <InputFile onChange={handleChangeFile}></InputFile>

                <div className='mt-3 text-gray-400'>
                  <div>Dụng lượng file tối đa 1 MB</div>
                  <div>Định dạng:.JPEG, .PNG</div>
                </div>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}

function Info() {
  const {
    register,
    control,
    formState: { errors }
  } = useFormContext<FormData>()
  return (
    <>
      <div className='mt-2 flex flex-wrap  flex-col sm:flex-row'>
        <div className='sm:w-[20%] truncate pt-3 sm:text-right capitalize'>Tên</div>
        <div className='sm:w-[80%] sm:pl-5'>
          <Input
            classNameInput='px-3 py-2 w-full outline-none border border-solid border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
            register={register}
            name='name'
            errorMessage={errors.name?.message}
            placeholder='Tên'
          />
        </div>
      </div>
      <div className='mt-2 flex flex-wrap  flex-col sm:flex-row'>
        <div className='sm:w-[20%] truncate pt-3 sm:text-right capitalize'>Số điện thoại</div>
        <div className='sm:w-[80%] sm:pl-5'>
          <Controller
            name='phone'
            control={control}
            render={({ field }) => (
              <InputNumber
                classNameInput='px-3 py-2 w-full outline-none border border-solid border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                errorMessage={errors.phone?.message}
                placeholder='Số điện thoại'
                {...field}
                onChange={field.onChange}
              />
            )}
          />
        </div>
      </div>
    </>
  )
}
