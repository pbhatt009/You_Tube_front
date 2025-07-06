import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import './index.css'
import { useSelector,useDispatch } from 'react-redux'
import App from './App.jsx'
import store from "../src/Store/store.js"
import { Header, Footer, Sidebar, LoginPage,RegisterPage,getcurrentUser,UploadVideopage,HomePage,Myvideos,Subscripition,WatchHistory,ChannelDashboard,EditChannelPage } from './utils/index.js'
 
 

const router=createBrowserRouter(createRoutesFromElements(
  
  <>
  {/* protected route */}
<Route path='/' element={<App/>}>
<Route path='/'element={<HomePage/>}></Route>
<Route path='/my-videos'element={<Myvideos/>}></Route>
<Route path='uploadVideo'element={<UploadVideopage/>}></Route>
<Route path='/subscriptions'element={<Subscripition/>}></Route>
<Route path='/history'element={<WatchHistory/>}></Route>
<Route path='/dashboard'element={<ChannelDashboard/>}></Route>
<Route path='/edit-channel'element={<EditChannelPage/>}></Route>
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
