import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { AuthModal } from './auth/AuthModal';
import { UserMenu } from './auth/UserMenu';
import ThemeToggle from './ThemeToggle';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBars,
    faTimes,
    faInfoCircle,
    faBug,
    faHome,
    faBolt,
    faLightbulb,
    faHourglass
} from '@fortawesome/free-solid-svg-icons';
import FeedbackModal from "./FeedbackModal.tsx";

const Layout: React.FC = () => {
    const { isAuthenticated, loading } = useAuth();
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [, setAuthMode] = useState<'login' | 'register'>('login');
    const location = useLocation();

    const handleAuthClick = (mode: 'login' | 'register') => {
        setAuthMode(mode);
        setShowAuthModal(true);
        setIsMobileMenuOpen(false); // Close mobile menu when auth modal opens
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const navLinks = [
        { to: "/", label: "Stories", icon: faHome },
        { to: "/submit-idea", label: "Submit idea", icon: faLightbulb },
        { to: "/schedule", label: "Schedule", icon: faHourglass },
        { to: "/upgrade", label: "Subscriptions", icon: faBolt },
        { to: "/about", label: "About me", icon: faInfoCircle }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500 flex flex-col">
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-300/20 dark:bg-primary-600/10 rounded-full blur-3xl transition-all duration-500"></div>
                <div className="absolute top-1/2 -left-40 w-96 h-96 bg-purple-300/20 dark:bg-purple-600/10 rounded-full blur-3xl transition-all duration-500"></div>
                <div className="absolute -bottom-40 right-1/3 w-80 h-80 bg-primary-400/20 dark:bg-primary-500/10 rounded-full blur-3xl transition-all duration-500"></div>
            </div>

            <header className="relative z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-white/30 dark:border-gray-700/30 shadow-lg transition-all duration-500">
                <div className="container mx-auto px-4 py-4">
                    <nav className="flex items-center justify-between">

                        <Link to="/" className="flex items-center gap-3" onClick={closeMobileMenu}>
                            <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg overflow-hidden">
                                <img
                                    src="https://mntdvvnqrwqggrsjulph.supabase.co/storage/v1/object/public/illusrations/icon.png"
                                    alt="Marcy's Private Space Icon"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="hidden sm:block">
                                <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100 transition-colors duration-300">
                                    Marcy's Private Space
                                </h1>
                                <p className="text-gray-600 dark:text-gray-400 text-sm transition-colors duration-300">
                                    Home of your beloved Devil
                                </p>
                            </div>
                        </Link>

                        <div className="hidden md:flex items-center gap-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className={`flex items-center gap-2 transition-colors duration-300 ${
                                        location.pathname === link.to ||
                                        (link.to !== '/' && location.pathname.startsWith(link.to))
                                            ? 'text-pink-600 dark:text-pink-400 font-semibold'
                                            : 'text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400'
                                    }`}
                                >
                                    <FontAwesomeIcon icon={link.icon} className="w-4 h-4" />
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        <div className="flex items-center gap-4">
                            <ThemeToggle />
                            <button
                                onClick={toggleMobileMenu}
                                className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
                                aria-label="Toggle menu"
                            >
                                <FontAwesomeIcon
                                    icon={isMobileMenuOpen ? faTimes : faBars}
                                    className="w-5 h-5"
                                />
                            </button>
                            <div className="hidden md:flex items-center gap-4">
                                {loading ? (
                                    <div className="w-8 h-8 border-2 border-pink-400 dark:border-pink-600 border-t-pink-600 dark:border-t-pink-400 rounded-full animate-spin"></div>
                                ) : isAuthenticated ? (
                                    <UserMenu />
                                ) : (
                                    <>
                                        <button
                                            onClick={() => handleAuthClick('login')}
                                            className="text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors duration-300 px-4 py-2 font-medium"
                                        >
                                            Sign In
                                        </button>
                                        <button
                                            onClick={() => handleAuthClick('register')}
                                            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 dark:from-pink-600 dark:to-purple-700 dark:hover:from-pink-700 dark:hover:to-purple-800 text-white px-6 py-2 rounded-full transition-all duration-200 transform hover:scale-105 font-medium shadow-lg hover:shadow-xl"
                                        >
                                            Join Us
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </nav>

                    <div className={`md:hidden transition-all duration-300 ease-in-out ${
                        isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                    }`}>
                        <div className="py-4 border-t border-gray-200 dark:border-gray-700 mt-4">
                            <div className="flex flex-col gap-3">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.to}
                                        to={link.to}
                                        onClick={closeMobileMenu}
                                        className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                                            location.pathname === link.to ||
                                            (link.to !== '/' && location.pathname.startsWith(link.to))
                                                ? 'bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 font-semibold'
                                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                        }`}
                                    >
                                        <FontAwesomeIcon icon={link.icon} className="w-4 h-4" />
                                        {link.label}
                                    </Link>
                                ))}
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                {loading ? (
                                    <div className="flex justify-center py-2">
                                        <div className="w-6 h-6 border-2 border-pink-400 dark:border-pink-600 border-t-pink-600 dark:border-t-pink-400 rounded-full animate-spin"></div>
                                    </div>
                                ) : isAuthenticated ? (
                                    <div className="px-3">
                                        <UserMenu />
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-2">
                                        <button
                                            onClick={() => handleAuthClick('login')}
                                            className="w-full text-center text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors duration-300 py-3 font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                                        >
                                            Sign In
                                        </button>
                                        <button
                                            onClick={() => handleAuthClick('register')}
                                            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 dark:from-pink-600 dark:to-purple-700 dark:hover:from-pink-700 dark:hover:to-purple-800 text-white py-3 rounded-lg transition-all duration-200 font-medium shadow-lg"
                                        >
                                            Join Us
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="relative z-10 flex-grow">
                <Outlet />
            </div>

            <footer className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-t border-white/30 dark:border-gray-700/30 py-6 mt-8 transition-all duration-500">
                <div className="container mx-auto px-4">
                    <div className="text-center text-gray-600 dark:text-gray-400 text-sm">
                        <p>Marcy Fletcher © {new Date().getFullYear()}</p>
                    </div>
                </div>
            </footer>

            <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
            />

            <FeedbackModal
                isOpen={showFeedbackModal}
                onClose={() => setShowFeedbackModal(false)}
            />

            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/20 dark:bg-black/40 z-40 md:hidden"
                    onClick={closeMobileMenu}
                />
            )}

            <button
                onClick={() => setShowFeedbackModal(true)}
                className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110 flex items-center justify-center group"
                aria-label="Send Feedback"
            >
                <FontAwesomeIcon icon={faBug} className="w-6 h-6" />
                <span className="absolute right-full mr-3 px-3 py-1 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                Report Issue
            </span>
            </button>
        </div>
    );
};

export default Layout;