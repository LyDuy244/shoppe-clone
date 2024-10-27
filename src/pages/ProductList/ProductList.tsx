import { keepPreviousData, useQuery } from '@tanstack/react-query'
import categoryApi from 'src/api/category,api'
import productApi from 'src/api/product.api'
import Paginate from 'src/components/Paginate'
import useQueryConfigs from 'src/hooks/useQueryConfigs'
import AsideFilter from 'src/pages/ProductList/components/AsideFilter'
import Product from 'src/pages/ProductList/components/Product/Product'
import SortProductList from 'src/pages/ProductList/components/SortProductList'
import { ProductListConfig } from 'src/types/product.type'

const ProductList = () => {
  const queryConfig = useQueryConfigs()
  const { data: productData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => productApi.getProducts(queryConfig as ProductListConfig),
    placeholderData: keepPreviousData,
    staleTime: 3 * 60 * 1000
  })
  const { data: categoryData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryApi.getCategories()
  })

  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        {productData && (
          <div className='grid grid-cols-12 gap-6'>
            <div className='col-span-2'>
              <AsideFilter categories={categoryData?.data.data || []} queryConfig={queryConfig} />
            </div>
            <div className='col-span-10'>
              <SortProductList
                queryConfig={queryConfig}
                pageSize={productData.data.data.pagination.page_size}
              ></SortProductList>
              <div className='mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2'>
                {productData.data.data.products.map((product) => (
                  <div className='col-span-1' key={product._id}>
                    <Product product={product} />
                  </div>
                ))}
              </div>
              <Paginate queryConfig={queryConfig} pageSize={productData.data.data.pagination.page_size} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductList
