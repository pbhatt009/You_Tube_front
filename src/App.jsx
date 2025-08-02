import { useEffect } from 'react'
import './App.css'
import { Header, Footer, Sidebar, getcurrentUser, updaterefreshtoken } from './utils/index.js';
import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import { login } from './Store/Auth_reducer.jsx';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.status);

  useEffect(() => {
    const initializeAuth = async () => {
      if (!isAuthenticated) {
        try {
          // First try to get current user
          const currentuser = await getcurrentUser();
          if (currentuser.data) {
            dispatch(login(currentuser.data.data));
            return;
          }

          // If no current user, try refresh token
          const refreshtoken = await updaterefreshtoken();
          if (refreshtoken.data) {
            dispatch(login(refreshtoken.data.data));
            return;
          }
        } catch (error) {
          console.error('Authentication initialization failed:', error);
        }
      }
    };

    initializeAuth();
  }, [isAuthenticated, dispatch]);

  // Always render the main app layout
  return (
    <div className='bg-gradient-to-br from-gray-900 via-gray-800 to-black w-full h-screen overflow-hidden'>
      <Header className="sticky top-0 z-50" />
      
      <div className='flex w-full flex-row h-[80vh] sm:h-[88vh] lg:h-[89vh]'>
        <Sidebar />
        <main className='w-full sm:w-[81vw] lg:w-[85vw] xl:w-[89vw] h-full bg-gray-50 overflow-y-auto'>
          <Outlet />
        </main>
      </div>
      
      <div className='w-full h:[8vh]'>
        <Footer />
      </div>
    </div>
  );
}

export default App
