import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main className='h-screen w-full flex flex-col justify-center items-center '>
      <Helmet>
        <title>Trang 404 | Shoppe Clone</title>
        <meta name='description' content='Trang 404 của dự án shoppe clone' />
      </Helmet>
      <h1 className='text-9xl font-extrabold text-gray-900 tracking-widest'>404</h1>
      <div className='bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute text-white'>Page Not Found</div>
      <button className='mt-5'>
        <Link
          to='/'
          className='relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring'
        >
          <span className='relative block px-8 py-3 bg-orange text-white border border-current'>
            <span>Go Home</span>
          </span>
        </Link>
      </button>
    </main>
  )
}
