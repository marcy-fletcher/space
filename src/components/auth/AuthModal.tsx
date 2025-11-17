import { useState } from 'react'
import { Login } from './Login'
import { Register } from './Register'

interface AuthModalProps {
    isOpen: boolean
    onClose: () => void
}

type AuthMode = 'login' | 'register'

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
    const [mode, setMode] = useState<AuthMode>('login')

    if (!isOpen) return null

    const handleSwitchMode = () => {
        setMode(mode === 'login' ? 'register' : 'login')
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="relative w-full max-w-md">
                <button
                    onClick={onClose}
                    className="absolute -top-4 -right-4 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-gray-700 transition-colors z-10 shadow-lg"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                
                {mode === 'login' ? (
                    <Login onSwitchToRegister={handleSwitchMode} onClose={onClose} />
                ) : (
                    <Register onSwitchToLogin={handleSwitchMode} onClose={onClose} />
                )}
            </div>
        </div>
    )
}