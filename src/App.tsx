import { ToastContainer } from 'react-toastify'
import useRouteElement from 'src/useRouteElement'
import 'react-toastify/dist/ReactToastify.css'
import { useContext, useEffect } from 'react'
import { localStorageEventTarget } from 'src/utils/auth'
import { AppContext } from 'src/context/app.context'

function App() {
  const routeElements = useRouteElement()
  const { reset } = useContext(AppContext)
  useEffect(() => {
    localStorageEventTarget.addEventListener('clearLS', reset)

    return () => {
      localStorageEventTarget.removeEventListener('clearLS', reset)
    }
  }, [reset])
  return (
    <>
      {routeElements}
      <ToastContainer />
    </>
  )
}

export default App
