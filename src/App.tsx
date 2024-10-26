import { ToastContainer } from 'react-toastify'
import useRouteElement from 'src/useRouteElement'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const routeElements = useRouteElement()
  return (
    <>
      {routeElements}
      <ToastContainer />
    </>
  )
}

export default App
