import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import{EyeIcon,EyeSlashIcon} from '@heroicons/react/24/outline';
import { loginreq } from '../utils/index.js';
import { useDispatch } from 'react-redux';
import { login } from '../Store/Auth_reducer.jsx';
const LoginPage = () => {
    const Navigate = useNavigate();
    const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [showpassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    // console.log(formData);
    // Simulate a login request
    const logindata=await loginreq(formData);
    if(logindata.data){
        dispatch(login(logindata.data.data));
        Navigate('/', { replace: true });
    }
    else if(logindata.error){
        setError(logindata.error.message || 'Login failed. Please try again.');

    }
    setLoading(false);

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md text-black">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
          required={true}
            type="text"
            name="emailorusername"
            placeholder="Username or Email"
            value={formData.emailorusername}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className='flex flex-row items-center justify-between'>
          <input
           required={true}
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
            <p className='text-center text-sm my-2'>not registered yet? Click here to <Link to="/register" replace={true} className="text-indigo-600 hover:underline">register</Link>.</p>
          <div className='flex justify-center items-center'>{error && <p className="text-red-500 text-sm">{error}</p>} </div>
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
