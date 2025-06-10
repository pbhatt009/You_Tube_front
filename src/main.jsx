import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.jsx'
const router=createBrowserRouter(createRoutesFromElements(
<Route path='/' element={<App/>}>


</Route>

  
))
createRoot(document.getElementById('root')).render(
  <StrictMode>
    < Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>

  </StrictMode>,
)
