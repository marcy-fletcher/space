import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { UserService } from "../../services/user.ts";
import {UserSubscription} from "../../types/userSubscription.ts";
import { useNavigate } from 'react-router-dom'; // Add this import

export function UserMenu() {
    const { user, signOut } = useAuth()
    const navigate = useNavigate() // Add this hook
    const [isOpen, setIsOpen] = useState(false)
    const [subscription, setSubscription] = useState<UserSubscription | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchSubscription = async () => {
            if (user?.id) {
                setIsLoading(true)
                const subData = await UserService.getUserSubscription(user.id)
                setSubscription(subData)
                setIsLoading(false)
            }
        }

        fetchSubscription()
    }, [user?.id])

    if (!user) return null

    const displayName = user.user_metadata?.full_name || 'User'
    const avatar =  user.user_metadata?.avatar_url

    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'Never expires'
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    const handleSignOut = async () => {
        await signOut()
        setIsOpen(false)
    }

    const handleInvitesClick = () => {
        navigate('/invites') // Navigate to invites route
        setIsOpen(false) // Close the menu
    }

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 bg-white/95 dark:bg-gray-800/95 hover:bg-white dark:hover:bg-gray-800 backdrop-blur-md rounded-full px-4 py-2 text-gray-700 dark:text-gray-300 transition-all duration-200 border border-gray-200 dark:border-gray-600 shadow-sm"
            >
                {avatar ? (
                    <img
                        src={avatar}
                        alt={displayName}
                        className="w-8 h-8 rounded-full object-cover"
                    />
                ) : (
                    <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {displayName.charAt(0).toUpperCase()}
                    </div>
                )}
                <span className="text-sm font-medium hidden sm:block">{displayName}</span>
                <svg className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute right-0 top-full mt-2 w-80 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-xl border border-gray-200 dark:border-gray-600 shadow-xl z-20 overflow-hidden">
                        <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                            <div className="flex items-center gap-3 mb-4">
                                {avatar ? (
                                    <img
                                        src={avatar}
                                        alt={displayName}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                                        {displayName.charAt(0).toUpperCase()}
                                    </div>
                                )}
                                <div className="flex-1 min-w-0">
                                    <p className="text-gray-900 dark:text-gray-100 font-medium text-sm truncate">{displayName}</p>
                                    <p className="text-gray-500 dark:text-gray-400 text-xs truncate">{user.email}</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Account Tier</span>
                                    {isLoading ? (
                                        <div className="w-16 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                                    ) : (
                                        <span className={`text-sm font-semibold text-gray-600 dark:text-gray-400`}>
                                            {subscription ? subscription.title : 'Guest'}
                                        </span>
                                    )}
                                </div>

                                {!isLoading && subscription && (
                                    <>
                                        {subscription.level !== 1 && subscription.expiresAt && (
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Renews</span>
                                                <span className="text-xs text-gray-600 dark:text-gray-300 font-medium">
                                                    {formatDate(subscription.expiresAt)}
                                                </span>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="p-2 space-y-1"> {/* Added space-y-1 for consistent spacing */}
                            {!isLoading && (
                                <button
                                    onClick={handleInvitesClick}
                                    className="w-full flex items-center gap-2 px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors duration-200 text-sm font-medium"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                    </svg>
                                    Invites
                                </button>
                            )}

                            <button
                                onClick={handleSignOut}
                                className="w-full flex items-center gap-2 px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors duration-200 text-sm font-medium"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Sign Out
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}