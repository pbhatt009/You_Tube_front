import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import './index.css'
import { useSelector,useDispatch } from 'react-redux'
import App from './App.jsx'
import store from "../src/Store/store.js"
import { Header, Footer, Sidebar, LoginPage,RegisterPage,getcurrentUser } from './utils/index.js'
 
 

const router=createBrowserRouter(createRoutesFromElements(
  
  <>
  {/* protected route */}
<Route path='/' element={<App/>}>

</Route>
{/* public routes */}
<Route path='/login'element={<LoginPage/>}></Route>
<Route path='/register' element={<RegisterPage/>}></Route>
</>
))
createRoot(document.getElementById('root')).render(
  <StrictMode>
    < Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>

  </StrictMode>,
)
