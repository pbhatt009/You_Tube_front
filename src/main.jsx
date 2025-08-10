import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.jsx'
import store from "../src/Store/store.js"
import IsAuthenticated from './components/IsAuthenticated.jsx'
import {ResetPassword, Header, Footer, Sidebar, LoginPage, RegisterPage, UploadVideopage, HomePage, Myvideos, Subscripition, WatchHistory, ChannelDashboard, EditChannelPage, ChangePasswordPage, UpdateVideoPage, VideoDashboard } from './utils/index.js'

const router = createBrowserRouter(createRoutesFromElements(
  <>
    {/* Main App Layout */}
    <Route path='/' element={<App />}>
      {/* Public Routes */}
      <Route index element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
     
      <Route path='/videodashboard' element={
      
          <VideoDashboard />
       
      } />
      
      {/* Protected Routes */}
      <Route path='/my-videos' element={
        <IsAuthenticated>
          <Myvideos />
        </IsAuthenticated>
      } />
      <Route path='/uploadVideo' element={
        <IsAuthenticated>
          <UploadVideopage />
        </IsAuthenticated>
      } />
      <Route path='/subscriptions' element={
        <IsAuthenticated>
          <Subscripition />
        </IsAuthenticated>
      } />
      <Route path='/history' element={
        <IsAuthenticated>
          <WatchHistory />
        </IsAuthenticated>
      } />
      <Route path='/dashboard' element={
        <IsAuthenticated>
          <ChannelDashboard />
        </IsAuthenticated>
      } />
      <Route path='/edit-channel' element={
        <IsAuthenticated>
          <EditChannelPage />
        </IsAuthenticated>
      } />
      <Route path='/changepassword' element={
        <IsAuthenticated>
          <ChangePasswordPage />
        </IsAuthenticated>
      } />
      <Route path='/updateVideo' element={
        <IsAuthenticated>
          <UpdateVideoPage />
        </IsAuthenticated>
      } />
      
    </Route>
    <Route path='/resetpassword' element={<ResetPassword />} />

  </>
))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
