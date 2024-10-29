import { Purchase, PurchaseListStatus } from "src/types/purchase.type"
import { SuccessResponseApi } from "src/types/utils.type"
import http from "src/utils/http"

const URL = '/purchases'

const purchasesApi = {
  addToCart: (body: { product_id: string, buy_count: number }) => http.post<SuccessResponseApi<Purchase>>(`${URL}/add-to-cart`, body),
  getPurchaseList: (params: { status: PurchaseListStatus }) => http.get<SuccessResponseApi<Purchase[]>>(URL, {
    params
  }),
  buyProducts: (body: { product_id: string, buy_count: number }[]) => http.post<SuccessResponseApi<Purchase[]>>(`${URL}/buy-products`, body),
  updatePurchase: (body: { product_id: string, buy_count: number }) => http.put<SuccessResponseApi<Purchase>>(`${URL}/update-purchase`, body),
  deletePurchase: (purchaseIds: string[]) => http.delete<SuccessResponseApi<{ deleted_count: number }>>(`${URL}`, {
    data: purchaseIds
  })
}

export default purchasesApi