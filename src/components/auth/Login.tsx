import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import toast from 'react-hot-toast'

interface LoginProps {
    onSwitchToRegister: () => void
    onClose?: () => void
}

export function Login({ onSwitchToRegister, onClose }: LoginProps) {
    const { signIn } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!email || !password) {
            toast.error('Please fill in all fields')
            return
        }

        setLoading(true)
        try {
            await signIn(email, password)
            toast.success('Welcome back!')
            onClose?.()
        } catch (error: any) {
            toast.error(error.message || 'Failed to sign in')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full max-w-md mx-auto bg-white/95 backdrop-blur-md rounded-2xl p-8 border border-white/30 shadow-xl">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
                <p className="text-gray-600">Sign in to continue your journey</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
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
                        placeholder="Enter your password"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                    {loading ? 'Signing in...' : 'Sign In'}
                </button>
            </form>

            <div className="mt-6 text-center">
                <p className="text-gray-600">
                    Don't have an account?{' '}
                    <button
                        onClick={onSwitchToRegister}
                        className="text-pink-600 hover:text-pink-700 font-medium transition-colors"
                    >
                        Sign up
                    </button>
                </p>
            </div>
        </div>
    )
}