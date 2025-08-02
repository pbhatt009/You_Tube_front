import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon, UserIcon, EnvelopeIcon, LockClosedIcon, PhotoIcon, ArrowRightIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { register, loginreq } from '../utils/index.js'
import { useDispatch, useSelector } from 'react-redux';
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
    const [showpassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [registerprocessing, setRegisterProcessing] = useState(false);
    const [registerdone, setRegisterDone] = useState(false);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        if (e.target.type === 'file') {
            setFormData(prev => ({
                ...prev,
                [e.target.name]: e.target.files[0]
            }));
            return;
        }
        setFormData(prev => {
            prev[e.target.name] = e.target.value;
            return { ...prev };
        });
        // Clear errors when user starts typing
        if (errors[e.target.name]) {
            setErrors(prev => ({ ...prev, [e.target.name]: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setRegisterProcessing(true);
        setRegisterDone(false);
        setErrors({});

        // Validation
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(formData.email)) {
            setErrors(prev => ({ ...prev, email: 'Invalid email format' }));
            setRegisterProcessing(false);
            return;
        }
        if (formData.password.length < 6) {
            setErrors(prev => ({ ...prev, password: 'Password must be at least 6 characters' }));
            setRegisterProcessing(false);
            return;
        }
        if (formData.avatar?.type.split('/')[0] !== 'image') {
            setErrors(prev => ({ ...prev, avatar: 'Avatar should be an image' }));
            setRegisterProcessing(false);
            return;
        }
        if (formData.coverImage && formData.coverImage?.type.split('/')[0] !== 'image') {
            setErrors(prev => ({ ...prev, coverImage: 'Cover image should be an image' }));
            setRegisterProcessing(false);
            return;
        }

        const fdata = new FormData();
        for (const key in formData) {
            if (formData[key] !== null && formData[key] !== undefined) {
                fdata.append(key, formData[key]);
            }
        }

        const result = await register(fdata);
        if (result.error) {
            setErrors(prev => ({ ...prev, general: result.error.message }));
            setRegisterProcessing(false);
            return;
        }

        setRegisterDone(true);

        const loginData = await loginreq({
            "username": fdata.get('username'),
            "password": fdata.get('password')
        });

        if (loginData.error) {
            setErrors(prev => ({ ...prev, general: loginData.error.message }));
            setRegisterProcessing(false);
            setRegisterDone(false);
            return;
        }

        dispatch(login(loginData.data.data));
        setRegisterProcessing(false);
        setRegisterDone(false);
        Navigate('/', { replace: true });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
            <div className="w-full max-w-2xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full mb-4 shadow-lg">
                        <UserIcon className="h-8 w-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
                    <p className="text-gray-400">Join our community and start sharing your content</p>
                </div>

                {/* Register Form */}
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Full Name */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Full Name</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="fullName"
                                        placeholder="Enter your full name"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 pl-12 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all duration-200"
                                    />
                                    <UserIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                </div>
                                {errors.fullName && <p className="text-red-400 text-sm">{errors.fullName}</p>}
                            </div>

                            {/* Username */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Username</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="username"
                                        placeholder="Choose a username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 pl-12 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all duration-200"
                                    />
                                    <UserIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                </div>
                                {errors.username && <p className="text-red-400 text-sm">{errors.username}</p>}
                            </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Email Address</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email address"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 pl-12 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all duration-200"
                                />
                                <EnvelopeIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            </div>
                            {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Password</label>
                            <div className="relative">
                                <input
                                    type={showpassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Create a strong password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 pl-12 pr-12 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all duration-200"
                                />
                                <LockClosedIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showpassword)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                                >
                                    {showpassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                                </button>
                            </div>
                            {errors.password && <p className="text-red-400 text-sm">{errors.password}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Avatar */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Profile Picture</label>
                                <div className="relative">
                                    <input
                                        type="file"
                                        name="avatar"
                                        required
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 pl-12 bg-white/10 border border-white/20 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-500 file:text-white hover:file:bg-red-600 transition-all duration-200"
                                    />
                                    <PhotoIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                </div>
                                {errors.avatar && <p className="text-red-400 text-sm">{errors.avatar}</p>}
                            </div>

                            {/* Cover Image */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Cover Image (Optional)</label>
                                <div className="relative">
                                    <input
                                        type="file"
                                        name="coverImage"
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 pl-12 bg-white/10 border border-white/20 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-500 file:text-white hover:file:bg-gray-600 transition-all duration-200"
                                    />
                                    <PhotoIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                </div>
                                {errors.coverImage && <p className="text-red-400 text-sm">{errors.coverImage}</p>}
                            </div>
                        </div>

                        {/* General Error */}
                        {errors.general && (
                            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                                <p className="text-red-400 text-sm text-center">{errors.general}</p>
                            </div>
                        )}

                        {/* Submit Button */}
                        {!registerprocessing ? (
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                            >
                                Create Account
                                <ArrowRightIcon className="h-5 w-5" />
                            </button>
                        ) : !registerdone ? (
                            <button
                                type="button"
                                disabled
                                className="w-full bg-gray-600 text-white font-semibold py-3 px-4 rounded-xl opacity-50 cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                Creating Account...
                            </button>
                        ) : (
                            <div className="w-full bg-green-500/10 border border-green-500/20 rounded-lg p-3 flex items-center justify-center gap-2">
                                <CheckCircleIcon className="h-5 w-5 text-green-400" />
                                <span className="text-green-400 text-sm">Account Created! Signing you in...</span>
                            </div>
                        )}

                        {/* Login Link */}
                        <div className="text-center pt-4 border-t border-white/10">
                            <p className="text-gray-400 text-sm">
                                Already have an account?{' '}
                                <Link
                                    to="/login"
                                    className="text-red-400 hover:text-red-300 font-medium transition-colors duration-200"
                                >
                                    Sign in here
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>

                {/* Footer */}
                <div className="text-center mt-8">
                    <p className="text-gray-500 text-sm">
                        © 2024 YouTube Clone. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}
