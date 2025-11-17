import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import toast from 'react-hot-toast'

interface RegisterProps {
    onSwitchToLogin: () => void
    onClose?: () => void
}

export function Register({ onSwitchToLogin, onClose }: RegisterProps) {
    const { signUp } = useAuth()
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!fullName || !email || !password || !confirmPassword) {
            toast.error('Please fill in all fields')
            return
        }

        if (password !== confirmPassword) {
            toast.error('Passwords do not match')
            return
        }

        if (password.length < 6) {
            toast.error('Password must be at least 6 characters')
            return
        }

        setLoading(true)
        try {
            await signUp(email, password, fullName)
            toast.success('Account created successfully! Please check your email to verify your account.')
            onClose?.()
        } catch (error: any) {
            toast.error(error.message || 'Failed to create account')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full max-w-md mx-auto bg-white/95 backdrop-blur-md rounded-2xl p-8 border border-white/30 shadow-xl">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Join Our Community</h2>
                <p className="text-gray-600">Create your account to start your journey</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                        Account name
                    </label>
                    <input
                        id="fullName"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                        placeholder="Enter your account name"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                        placeholder="Enter your email"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                        placeholder="Create a password"
                        required
                        minLength={6}
                    />
                </div>

                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm Password
                    </label>
                    <input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                        placeholder="Confirm your password"
                        required
                        minLength={6}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                    {loading ? 'Creating Account...' : 'Create Account'}
                </button>
            </form>

            <div className="mt-6 text-center">
                <p className="text-gray-600">
                    Already have an account?{' '}
                    <button
                        onClick={onSwitchToLogin}
                        className="text-pink-600 hover:text-pink-700 font-medium transition-colors"
                    >
                        Sign in
                    </button>
                </p>
            </div>
        </div>
    )
}