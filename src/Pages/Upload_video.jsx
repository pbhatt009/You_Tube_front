import React, { useState, useRef } from 'react';
import { Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { register,loginreq,uploadVideo} from '../utils/index.js'
import { useDispatch,useSelector } from 'react-redux';
import { login } from '../Store/Auth_reducer.jsx';
import { 
  CloudArrowUpIcon, 
  PhotoIcon, 
  VideoCameraIcon, 
  EyeIcon, 
  EyeSlashIcon,
  XMarkIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

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
  const [uploading,setuploading]=useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [videoPreview, setVideoPreview] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  
  const videoInputRef = useRef(null);
  const thumbnailInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e, type) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleFileSelect(file, type);
    }
  };

  const handleFileSelect = (file, type) => {
    if (type === 'video') {
      if (file.type.split('/')[0] !== 'video') {
        setErrors(prev => ({ ...prev, videoFile: 'Please select a valid video file' }));
        return;
      }
      setFormData(prev => ({ ...prev, videoFile: file }));
      setVideoPreview(URL.createObjectURL(file));
      setErrors(prev => ({ ...prev, videoFile: null }));
    } else if (type === 'thumbnail') {
      if (file.type.split('/')[0] !== 'image') {
        setErrors(prev => ({ ...prev, thumbnail: 'Please select a valid image file' }));
        return;
      }
      setFormData(prev => ({ ...prev, thumbnail: file }));
      setThumbnailPreview(URL.createObjectURL(file));
      setErrors(prev => ({ ...prev, thumbnail: null }));
    }
  };

  const handleChange = (e) => {
    if (e.target.type === 'file') {
      const file = e.target.files[0];
      const type = e.target.name === 'videoFile' ? 'video' : 'thumbnail';
      handleFileSelect(file, type);
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: null }));
    }
  };

  const removeFile = (type) => {
    if (type === 'video') {
      setFormData(prev => ({ ...prev, videoFile: null }));
      setVideoPreview(null);
      if (videoInputRef.current) videoInputRef.current.value = '';
    } else if (type === 'thumbnail') {
      setFormData(prev => ({ ...prev, thumbnail: null }));
      setThumbnailPreview(null);
      if (thumbnailInputRef.current) thumbnailInputRef.current.value = '';
    }
  };

  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setuploading(true);
    setErrors({});
    
    // Validation
    if (!formData.videoFile) {
      setErrors(prev => ({ ...prev, videoFile: 'Video file is required' }));
      setuploading(false);
      return;
    }
    
    if (!formData.tittle.trim()) {
      setErrors(prev => ({ ...prev, tittle: 'Title is required' }));
      setuploading(false);
      return;
    }
    
    if (!formData.description.trim()) {
      setErrors(prev => ({ ...prev, description: 'Description is required' }));
      setuploading(false);
      return;
    }

    const fdata = new FormData();
    for (const key in formData) {
      if (formData[key] !== null && formData[key] !== undefined) {
        fdata.append(key, formData[key]);
      }
    }
    
    const result = await uploadVideo(fdata);
    if (result.error) {
      setErrors(prev => ({ ...prev, general: result.error.message }));
      setuploading(false);
      return;
    }

    setuploading(false);
    Navigate('/my-videos', { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Upload Your Video</h1>
          <p className="text-gray-600 text-lg">Share your amazing content with the world</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Video Upload Section */}
          <div className="p-6 sm:p-8 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <VideoCameraIcon className="h-5 w-5 text-red-500" />
              Video File
            </h2>
            
            <div
              className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                dragActive 
                  ? 'border-red-400 bg-red-50' 
                  : formData.videoFile 
                    ? 'border-green-400 bg-green-50' 
                    : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={(e) => handleDrop(e, 'video')}
            >
              {!formData.videoFile ? (
                <div>
                  <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-lg font-medium text-gray-900 mb-2">Drop your video here</p>
                  <p className="text-gray-500 mb-4">or click to browse</p>
                  <button
                    type="button"
                    onClick={() => videoInputRef.current?.click()}
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                  >
                    Choose Video
                  </button>
                  <input
                    ref={videoInputRef}
                    type="file"
                    name="videoFile"
                    accept="video/*"
                    onChange={handleChange}
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-center">
                    <CheckCircleIcon className="h-8 w-8 text-green-500 mr-3" />
                    <span className="text-green-700 font-medium">{formData.videoFile.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFile('video')}
                      className="ml-3 p-1 rounded-full hover:bg-red-100 transition-colors duration-200"
                    >
                      <XMarkIcon className="h-5 w-5 text-red-500" />
                    </button>
                  </div>
                  {videoPreview && (
                    <video
                      src={videoPreview}
                      className="max-w-full h-48 object-cover rounded-lg mx-auto"
                      controls
                    />
                  )}
                </div>
              )}
            </div>
            {errors.videoFile && (
              <div className="flex items-center gap-2 mt-3 text-red-600">
                <ExclamationTriangleIcon className="h-4 w-4" />
                <span className="text-sm">{errors.videoFile}</span>
              </div>
            )}
          </div>

          {/* Form Fields */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="tittle" className="block text-sm font-medium text-gray-700 mb-2">
                Video Title *
              </label>
              <input
                type="text"
                id="tittle"
                name="tittle"
                value={formData.tittle}
                onChange={handleChange}
                placeholder="Enter an engaging title for your video"
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all duration-200 ${
                  errors.tittle ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.tittle && (
                <div className="flex items-center gap-2 mt-2 text-red-600">
                  <ExclamationTriangleIcon className="h-4 w-4" />
                  <span className="text-sm">{errors.tittle}</span>
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                placeholder="Describe your video content..."
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all duration-200 resize-none ${
                  errors.description ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.description && (
                <div className="flex items-center gap-2 mt-2 text-red-600">
                  <ExclamationTriangleIcon className="h-4 w-4" />
                  <span className="text-sm">{errors.description}</span>
                </div>
              )}
            </div>

            {/* Thumbnail Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4 flex items-center gap-2">
                <PhotoIcon className="h-4 w-4 text-red-500" />
                Thumbnail (Optional)
              </label>
              
              <div
                className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all duration-200 ${
                  formData.thumbnail 
                    ? 'border-green-400 bg-green-50' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={(e) => handleDrop(e, 'thumbnail')}
              >
                {!formData.thumbnail ? (
                  <div>
                    <PhotoIcon className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Drop thumbnail image here</p>
                    <button
                      type="button"
                      onClick={() => thumbnailInputRef.current?.click()}
                      className="text-red-500 hover:text-red-600 font-medium text-sm transition-colors duration-200"
                    >
                      Choose Image
                    </button>
                    <input
                      ref={thumbnailInputRef}
                      type="file"
                      name="thumbnail"
                      accept="image/*"
                      onChange={handleChange}
                      className="hidden"
                    />
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center justify-center">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-green-700 text-sm font-medium">{formData.thumbnail.name}</span>
                      <button
                        type="button"
                        onClick={() => removeFile('thumbnail')}
                        className="ml-2 p-1 rounded-full hover:bg-red-100 transition-colors duration-200"
                      >
                        <XMarkIcon className="h-4 w-4 text-red-500" />
                      </button>
                    </div>
                    {thumbnailPreview && (
                      <img
                        src={thumbnailPreview}
                        alt="Thumbnail preview"
                        className="max-w-full h-32 object-cover rounded-lg mx-auto"
                      />
                    )}
                  </div>
                )}
              </div>
              {errors.thumbnail && (
                <div className="flex items-center gap-2 mt-2 text-red-600">
                  <ExclamationTriangleIcon className="h-4 w-4" />
                  <span className="text-sm">{errors.thumbnail}</span>
                </div>
              )}
            </div>

            {/* Visibility */}
            <div>
              <label htmlFor="visibility" className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                {formData.isPublic ? (
                  <EyeIcon className="h-4 w-4 text-green-500" />
                ) : (
                  <EyeSlashIcon className="h-4 w-4 text-gray-500" />
                )}
                Visibility
              </label>
              <select
                id="visibility"
                name="isPublic"
                value={formData.isPublic}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all duration-200"
              >
                <option value={true}>Public - Anyone can view</option>
                <option value={false}>Private - Only you can view</option>
              </select>
            </div>

            {/* Error Messages */}
            {errors.general && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex items-center gap-2 text-red-600">
                  <ExclamationTriangleIcon className="h-5 w-5" />
                  <span className="font-medium">{errors.general}</span>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={uploading}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 ${
                uploading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
              }`}
            >
              {uploading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Uploading...
                </div>
              ) : (
                'Upload Video'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
