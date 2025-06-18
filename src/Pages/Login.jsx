import React, { useState } from 'react';
import{EyeIcon,EyeSlashIcon} from '@heroicons/react/24/outline';
const LoginPage = () => {
  const [formData, setFormData] = useState({});
  const [showpassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
 
  };

  const handleSubmit = (e) => {
    e.preventDefault();

  
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md text-black">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="usernameOrEmail"
            placeholder="Username or Email"
            value={formData.usernameOrEmail}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className='flex flex-row items-center justify-between'>
          <input
             type={showpassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button type='button' className='m2 relative -ml-13 p-1 right-3' onClick={() => setShowPassword(!showpassword)}>
          {showpassword ?<EyeSlashIcon className=" h-4 w-4"  />:<EyeIcon className=" h-4 w-4" />}
            </button>
            </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
