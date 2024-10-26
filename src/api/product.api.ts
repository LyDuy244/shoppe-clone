import { Product, ProductList, ProductListConfig } from "src/types/product.type";
import { SuccessResponseApi } from "src/types/utils.type";
import http from "src/utils/http";

const URL = '/products'
const productApi = {
  getProducts: (params: ProductListConfig) => http.get<SuccessResponseApi<ProductList>>(URL, {
    params
  }),
  getProductDetail: (id: string) => http.get<SuccessResponseApi<Product>>(`${URL}/${id}`)
}

export default productApi