import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faUserPlus, faEnvelope, faLock, faUser, faCheckCircle, faEnvelopeOpen } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/story/LoadingSpinner';
import {useAuth} from "../contexts/AuthContext.tsx";

export function RegisterPage() {
    const { signUp } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
            toast.error('Please fill in all fields');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        if (formData.password.length < 6) {
            toast.error('Password must be at least 6 characters');
            return;
        }

        setLoading(true);
        try {
            await signUp(formData.email, formData.password, formData.fullName);
            setRegistrationSuccess(true);
        } catch (error: any) {
            toast.error(error.message || 'Failed to create account');
        } finally {
            setLoading(false);
        }
    };

    const handleBackToHome = () => {
        navigate('/');
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (registrationSuccess) {
        return (
            <div className="container mx-auto px-4 py-12 max-w-md min-h-screen">
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FontAwesomeIcon icon={faEnvelopeOpen} className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 font-serif mb-4">
                        Check Your Email!
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 font-sans mb-6">
                        We've sent a confirmation link to<br />
                        <strong className="text-primary-600 dark:text-primary-400">{formData.email}</strong>
                    </p>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-2 border-gray-100 dark:border-gray-700 mb-6">
                        <div className="space-y-4 text-left">
                            <div className="flex items-start gap-3">
                                <FontAwesomeIcon icon={faCheckCircle} className="w-5 h-5 text-green-500 mt-0.5" />
                                <div>
                                    <h3 className="font-semibold text-gray-800 dark:text-gray-200">Account Created Successfully</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                        Your account has been created but needs to be verified before you can log in.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5 text-blue-500 mt-0.5" />
                                <div>
                                    <h3 className="font-semibold text-gray-800 dark:text-gray-200">Verify Your Email</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                        Click the verification link in the email we sent to complete your registration.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <FontAwesomeIcon icon={faLock} className="w-5 h-5 text-purple-500 mt-0.5" />
                                <div>
                                    <h3 className="font-semibold text-gray-800 dark:text-gray-200">Secure Your Account</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                        Email verification helps us keep your account secure and ensure you have access to this email.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <button
                            onClick={handleBackToHome}
                            className="w-full bg-gradient-to-r from-primary-500 to-primary-600
                                     hover:from-primary-600 hover:to-primary-700
                                     text-white font-semibold py-3 px-6 rounded-xl
                                     transition-all duration-300 shadow-md hover:shadow-xl
                                     transform hover:-translate-y-0.5 font-sans
                                     inline-flex items-center justify-center gap-2"
                        >
                            <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" />
                            Back to Home Page
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-md min-h-screen">
            <div className="mb-8">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400
                     hover:text-primary-700 dark:hover:text-primary-300
                     font-medium transition-colors duration-300 group font-sans"
                >
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300"
                    />
                    Back to home
                </Link>
            </div>

            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FontAwesomeIcon icon={faUserPlus} className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 font-serif mb-3">
                    Join Our Community
                </h1>
                <p className="text-gray-600 dark:text-gray-400 font-sans">
                    Create your account to start your journey
                </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border-2 border-gray-100 dark:border-gray-700">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-sans">
                            Account Name
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FontAwesomeIcon icon={faUser} className="w-4 h-4 text-gray-400" />
                            </div>
                            <input
                                id="fullName"
                                name="fullName"
                                type="text"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-colors duration-300 font-sans"
                                placeholder="Enter your account name"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-sans">
                            Email Address
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4 text-gray-400" />
                            </div>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-colors duration-300 font-sans"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-sans">
                            Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FontAwesomeIcon icon={faLock} className="w-4 h-4 text-gray-400" />
                            </div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-colors duration-300 font-sans"
                                placeholder="Create a password"
                                required
                                minLength={6}
                            />
                        </div>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 font-sans">
                            Must be at least 6 characters
                        </p>
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-sans">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FontAwesomeIcon icon={faLock} className="w-4 h-4 text-gray-400" />
                            </div>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-colors duration-300 font-sans"
                                placeholder="Confirm your password"
                                required
                                minLength={6}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-pink-500 to-purple-600
                                 hover:from-pink-600 hover:to-purple-700
                                 text-white font-semibold py-3 px-6 rounded-xl
                                 transition-all duration-300 shadow-md hover:shadow-xl
                                 transform hover:-translate-y-0.5
                                 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                                 font-sans flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Creating Account...
                            </>
                        ) : (
                            <>
                                <FontAwesomeIcon icon={faCheckCircle} className="w-4 h-4" />
                                Create Account
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-600 dark:text-gray-400 font-sans">
                        Already have an account?{' '}
                        <Link
                            to="/login"
                            className="text-pink-600 hover:text-pink-700 font-medium transition-colors"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;