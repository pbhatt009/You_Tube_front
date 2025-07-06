import React, { useState } from 'react';
import { changePassword } from '../utils/index.js';
import{EyeIcon,EyeSlashIcon} from '@heroicons/react/24/outline';
export default function ChangePasswordPage() {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!formData.oldPassword || !formData.newPassword) {
      setError("Both fields are required.");
      setLoading(false);
      return;
    }

    const result=await changePassword(formData)
     console.log(result)
    if(result.error){
      setError(result.error.message)
      setLoading(false);
      return;
    }
    setSuccess(result.data.message);
    setLoading(false)

  }
  const [showold,setshowold]=useState(false);
  const [shownew,setshownew]=useState(false)

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Change Password</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Old Password</label>
          <input
            type={showold?"text":"password"}
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleChange}
            className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
          />
            <button type='button' className='m2 relative -ml-13 p-1 right-3' onClick={() => setshowold(!showold)}>
                    {showold ?<EyeSlashIcon className=" h-4 w-4"  />:<EyeIcon className=" h-4 w-4" />}
                      </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">New Password</label>
          <input
            type={shownew?"text":"password"}
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
          />
          <button type='button' className='m2 relative -ml-13 p-1 right-3' onClick={() => setshownew(!shownew)}>
                    {shownew ?<EyeSlashIcon className=" h-4 w-4"  />:<EyeIcon className=" h-4 w-4" />}
                      </button>
        </div>

        {error && <div className="text-red-500 text-sm">{error}</div>}
        {success && <div className="text-green-600 text-sm">{success}</div>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Changing..." : "Change Password"}
        </button>
      </form>
    </div>
  );
}
