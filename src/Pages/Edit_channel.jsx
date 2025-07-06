import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { updateavatar,updatecoverimage,updateuser } from '../utils';
export default function EditChannelPage() {
      const location=useLocation()
     const{channelData}=location.state||{};
  const [formData, setFormData] = useState({
    username: channelData.username || '',
    fullName: channelData.fullName || '',
    email: channelData.email || '',
    avatar: null,
    coverImage: null,
  });

  const [avatarPreview, setAvatarPreview] = useState(channelData.avatar || '');
  const [coverPreview, setCoverPreview] = useState(channelData.coverImage || '');
  const[Processing,setRegisterProcessing]=useState(false);
  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
   
  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
 

    if (type === 'avatar') {
        if(file.type.split('/')[0]!='image'){
        setErrors(prev => ({ ...prev, avatar:'avatar should be an image'}));     
       setRegisterProcessing(false);
        return;
    }
    const previewURL = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, avatar: file }));
      setAvatarPreview(previewURL);
    } 
    
    else if (type === 'cover') {
        if(file.type.split('/')[0]!='image'){
        setErrors(prev => ({ ...prev, coverImage:'coverimage should be an image'}));     
       setRegisterProcessing(false);
        return;
    }
       const previewURL = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, coverImage: file }));
      setCoverPreview(previewURL);
    }
  };

  const[error, setErrors]=useState({})
  const handleSubmit = (e) => {
    e.preventDefault();
       // console.log(formData);
       setRegisterProcessing(true)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!emailRegex.test(formData.email)) {
      setErrors(prev => ({ ...prev, email: 'Invalid email format' }));
      console.log('Invalid email format');
      setRegisterProcessing(false);

      return;
    }
 
     if(formData.avatar.type.split('/')[0]!='image'){
        setErrors(prev => ({ ...prev, avatar:'avatar should be an image'}));     
       setRegisterProcessing(false);
        return;
    }
    // console.log()
       if(formData.coverImage&&formData.coverImage?.type.split('/')[0]!='image'){
        setErrors(prev => ({ ...prev,coverImage:'cover image should be an image'}));     
       setRegisterProcessing(false);
        return;
    }
 
  };

  return (
    <div className="w-full h-full flex flex-col gap-6 overflow-y-scroll">
      {/* Cover Image */}
      <div className="h w-full">
       {coverPreview? <img
          src={coverPreview}
          alt="Cover"
          className="w-full h-48 object-cover rounded-lg"
        />: <div className="w-full h-60 z-1 object-cover rounded-lg justify-center items-center flex bg-gray-200">
          <p className="text-3xl z-1">no cover image</p>
        </div>}
        <label className="relative -top-10 -right-10 z-100 bg-black/60 text-white text-sm px-3 py-1 rounded cursor-pointer hover:bg-black">
          Edit Cover
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleImageChange(e, 'cover')}
          />
        </label>
      </div>

      {/* Avatar */}
      <div className="relative w-32 h-32 mx-auto">
        <img
          src={avatarPreview}
          alt="Avatar"
          className="w-32 h-32 object-cover rounded-full border shadow"
        />
        <label className="absolute bottom-1 h-9 w-10  right-0 bg-black/60 text-white text-s px-2 py-1 rounded-full cursor-pointer hover:bg-black">
          Edit
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleImageChange(e, 'avatar')}
          />
        </label>
      </div>

      {/* Text Fields */}
      <form onSubmit={handleSubmit} className="space-y-4 w-full flex flex-col justify-center items-center">
        <div>
          <label className="block text-sm font-medium text-gray-700">Username</label>
          <input
            name="username"
            value={formData.username}
            onChange={handleTextChange}
            className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            name="fullName"
            value={formData.fullName}
            onChange={handleTextChange}
            className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleTextChange}
            className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-50 mb-5 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
