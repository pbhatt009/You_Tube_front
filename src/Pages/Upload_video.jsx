import React, { useState } from 'react';
import { Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { register,loginreq,uploadVideo} from '../utils/index.js'
import { useDispatch,useSelector } from 'react-redux';
import { login } from '../Store/Auth_reducer.jsx';
export default function uploadVideopage() {
     const Navigate = useNavigate();
    const [formData, setFormData] = useState({
    tittle: '',
    description: '',
    thumbnail: null,
    videoFile:null,
    isPublic:true,
  });

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

  const dispatch = useDispatch();
  const handleSubmit =async (e) => {
   
    e.preventDefault();
   setuploading(true)
    setErrors({});
    // console.log(formData);
    
       if(formData.videoFile.type.split('/')[0]!='video'){
        setErrors(prev => ({ ...prev, videoFile:'Videofile should be a video'}));     
      setuploading(false)
        return;
    }
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
     const result=await uploadVideo(fdata);
     if(result.error){
          setErrors(prev => ({ ...prev, general:result.error.message}));     
          setuploading(false)
        return;
     }

     setuploading(false)
     Navigate('/my-videos', { replace: true });
}

const [uploading,setuploading]=useState(false);
  


  return (
    <div className="flex justify-center items-center  bg-gray-100 text-black h-full">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md h-full">
        <h2 className="text-2xl font-semibold text-center mb-6">Upload New Video</h2>
        
        <div className="mb-4">
          <label htmlFor="videoFile" className="block text-sm font-medium text-gray-700">Video File</label>
          <input
            type="file"
            name="videoFile"
            id="videoFile"
            accept="video/*"
             required
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

        </div>
         {errors.videoFile && <span className="text-red-500 text-sm relative -top-3">{errors.videoFile}</span>}
        <label htmlFor="tittle" className="block text-sm font-medium text-gray-700">Tittle</label>
        <input
          className="mb-4 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          label="tittle"
          type="text"
          id='tittle'
          name="tittle"
          placeholder="tittle"
          value={formData.tittle}
          onChange={handleChange}
          required
          error={errors.tittle}
        />
         {errors.tittle&& <span className="text-red-500 text-sm relative -top-3">{errors.tittle}</span>}
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <input
          className="mb-4 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          label="description"
          type="description"
          name="description"
          placeholder="description"
          value={formData.description}
          onChange={handleChange}
          required
          error={errors.description}
        />
         {errors.description && <span className="text-red-500 text-sm relative -top-3">{errors.description}</span>}
        
        

     
        <div className="mb-4">
          <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700">Thumbnail</label>
          <input
            type="file"
            name="thumbnail"
            id="thumbnail"
             accept="image/*"
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

        </div>
         {errors.thumbnail && <span className="text-red-500 text-sm relative -top-3">{errors.thumbnail}</span>}
  
         
        <div className='flex  justify-center items-center'><p className='text-red-500 text-sm'>{errors.general}</p></div>
         
         <label htmlFor="public"></label>
          <select
         id="visibility"
          name="isPublic"
           className="mb-3 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
           defaultValue="true"
           onChange={handleChange}
               >
           <option value="true">Public</option>
             <option value="false">Private</option>
            </select>
              
            <button type='submit'className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">{uploading?"uploading...":"Upload"}</button>
             {errors.general && <span className="text-red-500 text-sm relative -top-3">{errors.genreal}</span>}
      </form>
    </div>

  );
}
