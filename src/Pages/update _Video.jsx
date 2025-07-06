import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { updateVideo } from '../utils/index.js';
export default function UpdateVideoPage() {
    const location=useLocation()
    const{videoData}=location.state||{};
  const [formData, setFormData] = useState({
    tittle: videoData.tittle || '',
    description: videoData.description || '',
    thumbnail: null,
  });

  const [thumbnailPreview, setThumbnailPreview] = useState(videoData.thumbnail || '');
  const [loading, setuploading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, thumbnail: file }));
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors('');
    setSuccess('');
    setuploading(true)

    if(!formData.tittle.trim()){
         setErrors(prev => ({ ...prev, tittle:'tittle is required'}));     
        setuploading(false)
        return;
    }
        
    if(!formData.description.trim()){
         setErrors(prev => ({ ...prev, description:'description is required'}));     
        setuploading(false)
        return;
    }

     if(formData.thumbnail&&formData.thumbnail.type.split('/')[0]!='image'){
        setErrors(prev => ({ ...prev, thumbnail:'thumbnail should be an image'}));     
         setuploading(false)
        return;
    }

     
   const fdata=new FormData();
    for (const key in formData) {
      if (formData[key] !== null && formData[key] !== undefined) {
        fdata.append(key, formData[key]);
      }
    }
     const result=await updateVideo(videoData._id,fdata)
     if(result.error){
        setErrors(prev=>({...prev,general:result.error.message}))
        setuploading(false);
        return;
     }

     setSuccess(result.data.message)
     setuploading(false)
     return;

    
  };

  return (
    <div className="w-full h-full flex flex-col gap-6 overflow-y-scroll">
        <div  className="w-full sm:w-[60%] mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Update Video</h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Thumbnail Preview */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Thumbnail</label>
          <img
            src={thumbnailPreview}
            alt="Thumbnail Preview"
            className="w-full h-48 object-cover rounded border"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleThumbnailChange}
            className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0 file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
              {errors.thumbnail && <span className="text-red-500 text-sm relative -top-3">{errors.thumbnail}</span>}
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            name="tittle"
            value={formData.tittle}
            onChange={handleInputChange}
            className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
             required
          />
        </div>
             {errors.tittle && <span className="text-red-500 text-sm relative -top-3">{errors.tittle}</span>}
        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleInputChange}
            className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>
           {errors.description && <span className="text-red-500 text-sm relative -top-3">{errors.description}</span>}

        {/* Error / Success Messages */}
        {errors.general && <div className="text-red-500 text-sm">{errors.general}</div>}
        {success && <div className="text-green-600 text-sm">{success}</div>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
        >
          {loading ? "Updating..." : "Update Video"}
        </button>
      </form>
      </div>
    </div>
  );
}
