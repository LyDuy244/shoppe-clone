import Skeleton from 'src/components/Skeleton'

export default function SkeletonProductList() {
  return (
    <div className='col-span-10'>
      <div className='bg-gray-300/40 py-4 px-3'>
        <div className='flex flex-wrap items-center justify-between gap-2'>
          <div className='flex items-center flex-wrap gap-2'>
            <Skeleton width='90px' height='20px'></Skeleton>
            <Skeleton width='90px' height='30px'></Skeleton>
            <Skeleton width='90px' height='30px'></Skeleton>
            <Skeleton width='90px' height='30px'></Skeleton>
            <Skeleton width='150px' height='30px'></Skeleton>
          </div>
          <div className='flex items-center'>
            <Skeleton width='100px' height='30px'></Skeleton>
          </div>
        </div>
      </div>
      <div className='mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2'>
        {Array(10)
          .fill(0)
          .map((_,index) => (
            <div
              className='bg-white shadow-md rounded-sm hover:translate-y-[-0.03rem] hover:shadow-lg duration-100 transition-transform overflow-hidden'
              key={index}
            >
              <div className='w-full '>
                <Skeleton width='201px' height='201px'></Skeleton>
              </div>
              <div className='p-2 py-4 overflow-hidden'>
                <div className='min-h-[2rem] line-clamp-2 text-xs'>
                  <Skeleton height='20px'></Skeleton>
                </div>
                <div className='flex items-center mt-3 text-sm'>
                  <div className='line-through max-w-[50%] text-gray-500 truncate'>
                    <span className='text-sm'>
                      <Skeleton height='10px' width='50px'></Skeleton>
                    </span>
                  </div>
                  <div className='text-orange truncate ml-2'>
                    <span className='text-sm'>
                      <Skeleton height='10px' width='50px'></Skeleton>
                    </span>
                  </div>
                </div>
                <div className='mt-3 flex items-center'>
                  <Skeleton height='10px' width='70px'></Skeleton>
                  <div className='ml-2 text-xs'>
                    <span>
                      <Skeleton height='10px' width='70px'></Skeleton>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
