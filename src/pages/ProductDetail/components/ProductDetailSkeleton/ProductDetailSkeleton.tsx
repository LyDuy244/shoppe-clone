import Skeleton from 'src/components/Skeleton'

export default function ProductDetailSkeleton() {
  return (
    <>
      <div className='container'>
        <div className='p-4 bg-white shadow-sm'>
          <div className='grid grid-cols-12 gap-9'>
            <div className='col-span-5'>
              <Skeleton width='485px' height='485px'></Skeleton>
              <div className='relative mt-4 grid grid-cols-5 gap-1'>
                {Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <Skeleton key={index} width='93px' height='93px'></Skeleton>
                  ))}
              </div>
            </div>
            <div className='col-span-7'>
              <Skeleton width='90%' height='30px'></Skeleton>
              <div className='mt-8 flex items-center'>
                <div className='flex items-center'>
                  <Skeleton width='100px' height='20px'></Skeleton>
                </div>
                <div className='mx-4 h-4 w-[1px] bg-gray-300'></div>
                <div>
                  <Skeleton width='100px' height='20px'></Skeleton>
                </div>
              </div>
              <div className='mt-8 flex items-center bg-gray-50 px-5 py-2 gap-2'>
                <Skeleton width='130px' height='30px'></Skeleton>
                <Skeleton width='130px' height='30px'></Skeleton>
              </div>
              <div className='mt-8 flex items-center gap-2'>
                <Skeleton width='100px' height='30px'></Skeleton>
                <Skeleton width='30%' height='30px'></Skeleton>
                <Skeleton width='20%' height='30px'></Skeleton>
              </div>
              <div className='mt-8 flex items-center gap-4'>
                <Skeleton width='30%' height='50px'></Skeleton>
                <Skeleton width='15%' height='50px'></Skeleton>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-8'>
        <div className='container '>
          <div className='mt-8 p-4 bg-white py-8'>
            <div className='rounded-sm bg-gray-50 p-4 text-lg capitalize text-slate-700'>
              <Skeleton width='50%' height='30px'></Skeleton>
            </div>
            <div className='mx-4 mt-8 mb-4 text-sm leading-loose'>
              <Skeleton width='100%' height='400px'></Skeleton>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
