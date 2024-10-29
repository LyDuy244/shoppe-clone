import React, { Profiler, useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import Login from './pages/Login'
import ProductList from './pages/ProductList'
import Register from './pages/Register'
import RegisterLayout from './layouts/RegisterLayout'
import MainLayout from 'src/layouts/MainLayout'
import { AppContext } from 'src/context/app.context'
import path from 'src/constants/path'
import ProductDetail from 'src/pages/ProductDetail'
import Cart from 'src/pages/Cart'
import CartLayout from 'src/layouts/CartLayout'
import UserLayout from 'src/pages/User/Layout'
import ChangePassword from 'src/pages/User/ChangePassword'
import HistoryPurchase from 'src/pages/User/HistoryPurchase'
import Profile from 'src/pages/User/Profile'

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
              <Cart></Cart>
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
              element: <Profile></Profile>
            },
            {
              path: path.changePassword,
              element: <ChangePassword></ChangePassword>
            },
            {
              path: path.historyPurchase,
              element: <HistoryPurchase></HistoryPurchase>
            },
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
              <Login />
            </RegisterLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        }
      ]
    }
  ])

  return routeElements
}
