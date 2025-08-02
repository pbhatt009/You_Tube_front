import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getcurrentUser, updaterefreshtoken } from '../utils/index.js';
import { login } from '../Store/Auth_reducer.jsx';
import LoginAlert from './LoginAlert.jsx';

const IsAuthenticated = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.status);

  useEffect(() => {
    const checkAuth = async () => {
      if (!isAuthenticated) {
        try {
          // First try to get current user
          const currentuser = await getcurrentUser();
          if (currentuser.data) {
            dispatch(login(currentuser.data.data));
            setLoading(false);
            return;
          }

          // If no current user, try refresh token
          const refreshtoken = await updaterefreshtoken();
          if (refreshtoken.data) {
            dispatch(login(refreshtoken.data.data));
            setLoading(false);
            return;
          }

          // If neither works, user is not authenticated
          setLoading(false);
          setShowLoginAlert(true);
        } catch (error) {
          console.error('Authentication check failed:', error);
          setLoading(false);
          setShowLoginAlert(true);
        }
      } else {
        // User is already authenticated
        setLoading(false);
      }
    };

    checkAuth();
  }, [isAuthenticated, dispatch]);

  const handleCloseLoginAlert = () => {
    setShowLoginAlert(false);
    navigate('/');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="flex flex-col items-center space-y-6">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-red-500/30 border-t-red-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-r-red-400 rounded-full animate-spin" style={{animationDelay: '0.15s'}}></div>
          </div>
          <div className="text-center space-y-2">
            <h2 className="text-white text-2xl font-bold tracking-wide">YouTube Clone</h2>
            <p className="text-gray-300 text-sm font-medium animate-pulse">Checking authentication...</p>
          </div>
        </div>
      </div>
    );
  }

  // If not authenticated, show login alert
  if (!isAuthenticated) {
    return (
      <>
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
          <div className="text-center space-y-4">
            <h2 className="text-white text-2xl font-bold tracking-wide">Access Restricted</h2>
            <p className="text-gray-300 text-sm">Please login to access this page</p>
          </div>
        </div>
        
        <LoginAlert 
          isOpen={showLoginAlert}
          onClose={handleCloseLoginAlert}
          title="Login Required"
          message="You need to be logged in to access this page"
        />
      </>
    );
  }

  // If authenticated, render children
  return children;
};

export default IsAuthenticated; 