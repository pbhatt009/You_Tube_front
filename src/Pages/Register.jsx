import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon, UserIcon, EnvelopeIcon, LockClosedIcon, PhotoIcon, ArrowRightIcon, CheckCircleIcon, ClockIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { register, loginreq } from '../utils/index.js'
import { useDispatch } from 'react-redux';
import { login } from '../Store/Auth_reducer.jsx';
import OTPInput from 'react-otp-input';
import { sendOTP } from '../Requsets/User.requests.js';

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
    const [currentStep, setCurrentStep] = useState('form'); // 'form', 'otp', 'processing'
    const [otp, setOtp] = useState('');
    const [generatedOTP, setGeneratedOTP] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otpTimer, setOtpTimer] = useState(0);
    const [processing, setProcessing] = useState(false);
    const [success, setSuccess] = useState(false);
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

    const validateForm = () => {
        const newErrors = {};
        
        // Email validation
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }
        
        // Password validation
        if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        
        // Required fields
        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        }
        if (!formData.username.trim()) {
            newErrors.username = 'Username is required';
        }
        if (!formData.avatar) {
            newErrors.avatar = 'Profile picture is required';
        }
        
        // File type validation
        if (formData.avatar && formData.avatar.type.split('/')[0] !== 'image') {
            newErrors.avatar = 'Avatar should be an image';
        }
        if (formData.coverImage && formData.coverImage.type.split('/')[0] !== 'image') {
            newErrors.coverImage = 'Cover image should be an image';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Generate a random 6-digit OTP
    const generateOTP = () => {
        return Math.floor(100000 + Math.random() * 900000).toString();
    };

    const handleSendOTP = async () => {
        if (!validateForm()) {
            return;
        }

        setProcessing(true);
        setErrors({});

        try {
           
            
            // Generate OTP
            const newOTP = generateOTP();
            setGeneratedOTP(newOTP);
            const res=await sendOTP({email:formData.email,otp:newOTP,username:formData.username})
            if(res.error){
                setErrors({general:res.error.message})
                setProcessing(false)
                return
            }
            
            console.log('📧 OTP sent to', formData.email);
            
            setOtpSent(true);
            setCurrentStep('otp');
            setOtpTimer(60); // 60 seconds countdown
            setProcessing(false);
        } catch (error) {
            setErrors({ general: 'Failed to send OTP. Please try again.' });
            setProcessing(false);
        }
    };

    const handleResendOTP = async () => {
        if (otpTimer > 0) return;

        setProcessing(true);
        setErrors({});

        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Generate new OTP
            const newOTP = generateOTP();
            setGeneratedOTP(newOTP);
            const res=await sendOTP({email:formData.email,otp:newOTP,username:formData.username})
            if(res.error){
                setErrors({general:res.error.message})
                setProcessing(false)
                return
            }
            
            
            setOtpTimer(60);
            setProcessing(false);
        } catch (error) {
            setErrors({ general: 'Failed to resend OTP. Please try again.' });
            setProcessing(false);
        }
    };

    const handleVerifyOTP = async () => {
        if (otp.length !== 6) {
            setErrors({ otp: 'Please enter a 6-digit OTP' });
            return;
        }

        setProcessing(true);
        setErrors({});

        
            
            // Verify OTP
            if (otp === generatedOTP) {
                handleRegistration()
            } else {
                setErrors({ otp: 'Invalid OTP. Please check and try again.' });
                setProcessing(false);
            }
        
    };

    const handleRegistration = async () => {
        setCurrentStep('processing');
        setProcessing(true);
        setErrors({});

        try {
            const fdata = new FormData();
            for (const key in formData) {
                if (formData[key] !== null && formData[key] !== undefined) {
                    fdata.append(key, formData[key]);
                }
            }
            // console.log(fdata)
            const result = await register(fdata);
            console.log(result)
            if (result.error) {
                setErrors({ general: result.error.message });
                setProcessing(false);
                setCurrentStep('otp');
                return;
            }

            setSuccess(true);

            // Auto login after successful registration
            // console.log("login")
            const logininfo={
                emailorusername:formData.username,
                password:formData.password
            }
            console.log(logininfo)
            const loginData = await loginreq(logininfo);

            if (loginData.error) {
                setErrors({ general: loginData.error.message });
                setProcessing(false);
                setCurrentStep('otp');
                setSuccess(false);
                return;
            }

            dispatch(login(loginData.data.data));
            setProcessing(false);
            Navigate('/', { replace: true });
        } catch (error) {
            setErrors({ general: 'Registration failed. Please try again.' });
            setProcessing(false);
            setCurrentStep('otp');
            setSuccess(false);
        }
    };

    // Timer countdown effect
    React.useEffect(() => {
        let interval;
        if (otpTimer > 0) {
            interval = setInterval(() => {
                setOtpTimer(prev => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [otpTimer]);

    const goBackToForm = () => {
        setCurrentStep('form');
        setOtp('');
        setGeneratedOTP('');
        setOtpSent(false);
        setOtpTimer(0);
        setErrors({});
    };

    if (currentStep === 'otp') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
                <div className="w-full max-w-md">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full mb-4 shadow-lg">
                            <EnvelopeIcon className="h-8 w-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2">Verify Email</h1>
                        <p className="text-gray-400">Enter the 6-digit code sent to</p>
                        <p className="text-red-400 font-medium">{formData.email}</p>
                        
                     
                    </div>

                    {/* OTP Form */}
                    <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8">
                        <div className="space-y-6">
                            {/* OTP Input */}
                            <div className="space-y-4">
                                <label className="text-sm font-medium text-gray-300">Enter OTP</label>
                                <OTPInput
                                    value={otp}
                                    onChange={setOtp}
                                    numInputs={6}
                                    renderSeparator={<span className="mx-2 text-white">-</span>}
                                    renderInput={(props) => (
                                        <input
                                            {...props}
                                            className="w-12 h-12 text-center text-lg font-semibold bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all duration-200"
                                        />
                                    )}
                                />
                                {errors.otp && <p className="text-red-400 text-sm text-center">{errors.otp}</p>}
                            </div>

                            {/* Timer and Resend */}
                            <div className="text-center">
                                {otpTimer > 0 ? (
                                    <p className="text-gray-400 text-sm flex items-center justify-center gap-2">
                                        <ClockIcon className="h-4 w-4" />
                                        Resend OTP in {otpTimer}s
                                    </p>
                                ) : (
                                    <button
                                        onClick={handleResendOTP}
                                        disabled={processing}
                                        className="text-red-400 hover:text-red-300 font-medium transition-colors duration-200 disabled:opacity-50"
                                    >
                                        Resend OTP
                                    </button>
                                )}
                            </div>

                            {/* Error Message */}
                            {errors.general && (
                                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                                    <p className="text-red-400 text-sm text-center">{errors.general}</p>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="space-y-3">
                                <button
                                    onClick={handleVerifyOTP}
                                    disabled={processing || otp.length !== 6}
                                    className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:transform-none disabled:shadow-none"
                                >
                                    {processing ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            Verifying...
                                        </>
                                    ) : (
                                        <>
                                            Verify OTP
                                            <ArrowRightIcon className="h-5 w-5" />
                                        </>
                                    )}
                                </button>

                                <button
                                    onClick={goBackToForm}
                                    disabled={processing}
                                    className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 border border-white/20 flex items-center justify-center gap-2"
                                >
                                    <XCircleIcon className="h-5 w-5" />
                                    Back to Form
                                </button>
                            </div>
                        </div>
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

    if (currentStep === 'processing' && success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
                <div className="w-full max-w-md text-center">
                    <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4">
                            <CheckCircleIcon className="h-8 w-8 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-2">Account Created!</h1>
                        <p className="text-gray-400 mb-6">Your account has been successfully created and you're being signed in...</p>
                        <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
                    </div>
                </div>
            </div>
        );
    }

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
                    <form onSubmit={(e) => { e.preventDefault(); handleSendOTP(); }} className="space-y-6">
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
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:transform-none disabled:shadow-none"
                        >
                            {processing ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Sending OTP...
                                </>
                            ) : (
                                <>
                                    Send OTP
                                    <ArrowRightIcon className="h-5 w-5" />
                                </>
                            )}
                        </button>

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
