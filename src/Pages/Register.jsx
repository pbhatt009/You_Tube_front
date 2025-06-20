import React, { useState } from 'react';
import { Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { EyeIcon,EyeSlashIcon } from '@heroicons/react/24/outline';
import { register,loginreq } from '../utils/index.js'
import { useDispatch,useSelector } from 'react-redux';
import { login } from '../Store/Auth_reducer.jsx';
export default function RegisterForm() {
     const Navigate = useNavigate();
    const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    username: '',
    avatar: null,
    coverImage: null,
  });
  const[showpassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    //  console.log(e.target);
    if (e.target.type === 'file') {
        //   console.log(e.target.files[0].type.split('/'))
      setFormData(prev => ({
        ...prev,
       
        [e.target.name]: e.target.files[0] // Store the file object
      }));
      return;
    }
    setFormData(prev=>{
        prev[e.target.name] = e.target.value;
        return {...prev};
    })
          

  };
  const[registerprocessing, setRegisterProcessing] = useState(false);
  const[registerdone, setRegisterDone] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit =async (e) => {

    e.preventDefault();
   setRegisterProcessing(true);
    setRegisterDone(false);
    setErrors({});
    // console.log(formData);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!emailRegex.test(formData.email)) {
      setErrors(prev => ({ ...prev, email: 'Invalid email format' }));
      console.log('Invalid email format');
      setRegisterProcessing(false);

      return;
    }
    if (formData.password.length < 6) {
      setErrors(prev => ({ ...prev, password: 'Password must be at least 6 characters' }));     
      console.log('Password must be at least 6 characters');
        setRegisterProcessing(false);
      return;
    }
     if(formData.avatar.type.split('/')[0]!='image'){
        setErrors(prev => ({ ...prev, avatar:'avatar should be an image'}));     
       setRegisterProcessing(false);
        return;
    }
    console.log()
       if(formData.coverImage&&formData.coverImage?.type.split('/')[0]!='image'){
        setErrors(prev => ({ ...prev,coverImage:'cover image should be an image'}));     
       setRegisterProcessing(false);
        return;
    }
   const fdata=new FormData();
    for (const key in formData) {
      if (formData[key] !== null && formData[key] !== undefined) {
        fdata.append(key, formData[key]);
      }
    }
    // console.log(fdata);
    // console.log('Submitting form with data:', fdata);
    // Handle the form submission logic here
    // For example, you can send the data to your server using fetch or axios
   const result=await register(fdata);
    // console.log("data",result.data);
    // console.log("error",result.error);
    if(result.error){
      setErrors(prev => ({ ...prev, general: result.error.message }));
      console.log(result.error);
        setRegisterProcessing(false);
      return;
    }
   
    setRegisterDone(true);
     
    const loginData = await loginreq({
    "username": fdata.get('username'),
    "password": fdata.get('password')
}) 
// console.log(loginData);
if(loginData.error){
  setErrors(prev => ({ ...prev, general: loginData.error.message }));
    console.log(loginData.error);
    setRegisterProcessing(false);
  
  setRegisterDone(false);
  return;

}
// console.log("loginData",loginData.data.data);
 dispatch(login(loginData.data.data))
    
  setRegisterProcessing(false);
  setRegisterDone(false);
  Navigate('/', { replace: true });
  return;
  
}

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 text-black">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Create an Account</h2>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
        <input
          className="mb-4 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          label="Full Name"
          type="text"
          id='fullName'
          name="fullName"
          placeholder="full name"
          value={formData.fullName}
          onChange={handleChange}
          required
          error={errors.fullName}
        />
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          className="mb-4 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          label="Email"
          type="email"
          name="email"
          placeholder="email address"
          value={formData.email}
          onChange={handleChange}
          required
          error={errors.email}
        />
         {errors.email && <span className="text-red-500 text-sm relative -top-3">{errors.email}</span>}
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
         <div>
        <input
          className="mb-4 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          label="Password"
          type={showpassword ? "text" : "password"}
          name="password"
          placeholder="Your password"
          value={formData.password}
          onChange={handleChange}
          required
        
        />
         <button type='button' className='m2 relative -ml-13 p-1 right-3' onClick={() => setShowPassword(!showpassword)}>
                  {showpassword ?<EyeSlashIcon className=" h-4 w-4"  />:<EyeIcon className=" h-4 w-4" />}
                    </button>
        </div>
        {errors.password && <span className="text-red-500 text-sm relative -top-3">{errors.password}</span>}
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
        <input
          className="mb-4 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          label="Username"
          type="text"
          name="username"
          placeholder="Your username"
          value={formData.username}
          onChange={handleChange}
          required
          error={errors.username}
        />
        <div className="mb-4">
          <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">Avatar</label>
          <input
            type="file"
            name="avatar"
            id="avatar"
            required
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

        </div>
         {errors.avatar && <span className="text-red-500 text-sm relative -top-3">{errors.avatar}</span>}
        <div className="mb-4">
          <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700">Cover Image (Optional)</label>
          <input
            type="file"
            name="coverImage"
            id="coverImage"
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
         {errors.coverImage && <span className="text-red-500 text-sm relative -top-3">{errors.coverImage}</span>}
        <div className='flex  justify-center items-center'><p className='text-red-500 text-sm'>{errors.general}</p></div>
        <p className='text-center text-sm my-2'>Already registered? Click here to <Link to="/login" replace={true} className="text-indigo-600 hover:underline">login</Link>.</p>
          {!registerprocessing?  <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
          Register
        </button>:
           !registerdone?
        <button type="button" className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500" disabled>
          Processing...
        </button>:
        <div className='flex flex-row items-center justify-center w-100'>
        <span className="text-green-500 text-m ">Registered Successfully!Logging in</span>
        </div>}
      </form>
    </div>

  );
}
