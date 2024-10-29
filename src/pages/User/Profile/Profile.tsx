import React from 'react'
import Input from 'src/components/Input'

export default function Profile() {
  return (
    <div className='rounded-sm bg-white px-2 md:px-7 pb-20 shadow-sm'>
      <div className='border-b-gray-200 py-6 border-solid border-b'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>Hồ sơ của tôi</h1>
        <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
        <div className='mt-8 flex flex-col-reverse md:flex-row md:items-start'>
          <form className='mt-6 flex-grow md:pr-12 md:mt-0'>
            <div className='flex flex-wrap flex-col sm:flex-row'>
              <div className='sm:w-[20%] truncate pt-3 sm:text-right capitalize'>Email</div>
              <div className='sm:w-[80%] sm:pl-5'>
                <div className='pt-3 text-gray-700'>duy******@gmail.com</div>
              </div>
            </div>
            <div className='mt-2 flex flex-wrap  flex-col sm:flex-row'>
              <div className='sm:w-[20%] truncate pt-3 sm:text-right capitalize'>Tên</div>
              <div className='sm:w-[80%] sm:pl-5'>
                <Input classNameInput='px-3 py-2 w-full outline-none border border-solid border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm' />
              </div>
            </div>
            <div className='mt-2 flex flex-wrap  flex-col sm:flex-row'>
              <div className='sm:w-[20%] truncate pt-3 sm:text-right capitalize'>Số điện thoại</div>
              <div className='sm:w-[80%] sm:pl-5'>
                <Input classNameInput='px-3 py-2 w-full outline-none border border-solid border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm' />
              </div>
            </div>
            <div className='mt-2 flex flex-wrap  flex-col sm:flex-row'>
              <div className='sm:w-[20%] truncate pt-3 sm:text-right capitalize'>Địa chỉ</div>
              <div className='sm:w-[80%] sm:pl-5'>
                <Input classNameInput='px-3 py-2 w-full outline-none border border-solid border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm' />
              </div>
            </div>
            <div className='mt-2 flex flex-wrap  flex-col sm:flex-row'>
              <div className='sm:w-[20%] truncate pt-3 sm:text-right capitalize'>Ngày sinh</div>
              <div className='sm:w-[80%] sm:pl-5'>
                <div className='flex justify-between'>
                  <select name='' id='' value={''} className='h-10 w-[32%] border border-solid border-black/10 px-3'>
                    <option value={''} disabled>
                      Ngày
                    </option>
                  </select>
                  <select name='' id='' value={''} className='h-10 w-[32%] border border-solid border-black/10 px-3'>
                    <option value={''} disabled>
                      Tháng
                    </option>
                  </select>
                  <select name='' id='' value={''} className='h-10 w-[32%] border border-solid border-black/10 px-3'>
                    <option value={''} disabled>
                      Năm
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </form>
          <div className='flex justify-center md:w-72 md:border-l md:border-solid md:border-l-gray-200'>
            <div className='flex flex-col items-center'>
              <div className='my-5 h-24 w-24'>
                <img
                  src='https://meatworld.com.vn/wp-content/uploads/c70078d70f4e1277c2c9b9c95ddc83fePVx3j3.jpg'
                  className='w-full h-full rounded-full object-cover'
                  alt=''
                />
              </div>
              <input className='hidden' type='file' accept='.jpg,.jpeg,.png' />
              <button className='flex items-center h-10 justify-end rounded-sm border border-solid bg-white px-6 text-sm text-gray-600 shadow-sm'>
                Chọn ảnh
              </button>
              <div className='mt-3 text-gray-400'>
                <div>Dụng lượng file tối đa 1 MB</div>
                <div>Định dạng:.JPEG, .PNG</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
