import React from 'react';
import { useNavigate } from 'react-router-dom';
import { XMarkIcon, UserIcon, KeyIcon } from '@heroicons/react/24/outline';

const LoginAlert = ({ isOpen, onClose, title = "Login Required", message = "Please login or register to continue" }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    onClose();
    navigate('/login');
  };

  const handleRegister = () => {
    onClose();
    navigate('/register');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 ease-out">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <UserIcon className="h-5 w-5 text-red-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              <p className="text-sm text-gray-600">{message}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
          >
            <XMarkIcon className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-center mb-6">
            <p className="text-gray-700 mb-4">
              You need to be logged in to perform this action. Choose an option below to continue.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <KeyIcon className="h-4 w-4" />
              Login
            </button>
            
            <button
              onClick={handleRegister}
              className="w-full bg-white border-2 border-red-500 text-red-500 hover:bg-red-50 font-medium py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
            >
              <UserIcon className="h-4 w-4" />
              Register
            </button>
          </div>

          {/* Cancel Button */}
          <button
            onClick={onClose}
            className="w-full mt-4 text-gray-500 hover:text-gray-700 font-medium py-2 transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginAlert; 