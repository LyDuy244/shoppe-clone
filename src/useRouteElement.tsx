/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense, useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'

import RegisterLayout from './layouts/RegisterLayout'
import MainLayout from 'src/layouts/MainLayout'
import { AppContext } from 'src/context/app.context'
import path from 'src/constants/path'
import CartLayout from 'src/layouts/CartLayout'
import UserLayout from 'src/pages/User/Layout'
import ProductList from 'src/pages/ProductList'
import ProductDetail from 'src/pages/ProductDetail'

const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Cart = lazy(() => import('./pages/Cart'))
const ChangePassword = lazy(() => import('./pages/User/ChangePassword'))
const HistoryPurchase = lazy(() => import('./pages/User/HistoryPurchase'))
const Profile = lazy(() => import('./pages/User/Profile'))
const NotFound = lazy(() => import('./pages/Login'))

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to={'login'} />
}
function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to={''} />
}

export default function useRouteElement() {
  const routeElements = useRoutes([
    {
      path: '',
      index: true,
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    },
    {
      path: path.productDetail,
      element: (
        <MainLayout>
          <ProductDetail />
        </MainLayout>
      )
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.cart,
          element: (
            <CartLayout>
              <Suspense>
                <Cart></Cart>
              </Suspense>
            </CartLayout>
          )
        },
        {
          path: path.user,
          element: (
            <MainLayout>
              <UserLayout></UserLayout>
            </MainLayout>
          ),

          children: [
            {
              path: path.profile,
              element: (
                <Suspense>
                  <Profile></Profile>
                </Suspense>
              )
            },
            {
              path: path.changePassword,
              element: (
                <Suspense>
                  <ChangePassword></ChangePassword>
                </Suspense>
              )
            },
            {
              path: path.historyPurchase,
              element: (
                <Suspense>
                  <HistoryPurchase></HistoryPurchase>
                </Suspense>
              )
            }
          ]
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute></RejectedRoute>,
      children: [
        {
          path: path.login,
          element: (
            <RegisterLayout>
              <Suspense>
                <Login />
              </Suspense>
            </RegisterLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Suspense>
                <Register />
              </Suspense>
            </RegisterLayout>
          )
        }
      ]
    },
    {
      path: '*',
      element: (
        <MainLayout>
          <Suspense>
            <NotFound></NotFound>
          </Suspense>
        </MainLayout>
      )
    }
  ])

  return routeElements
}
