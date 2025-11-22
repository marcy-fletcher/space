import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout';
import PostsList from './pages/PostsList.tsx';
import PostPage from './pages/PostPage.tsx';
import AboutPage from "./pages/AboutPage.tsx";
import CreatePostPage from "./pages/CreatePostPage.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import SubscriptionsPage from "./pages/SubscriptionsPage.tsx";
import SubmitIdeaPage from "./pages/SubmitIdeaPage.tsx";
import WritingSchedulePage from "./pages/WritingSchedulePage.tsx";
import LogsDashboard from "./components/LogsDashboard.tsx";

const AgeVerification: React.FC = () => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full mx-auto text-center shadow-2xl">
                <div className="text-6xl mb-4">🔞</div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 font-serif">
                    Age Verification Required
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6 font-sans">
                    This website contains content intended for adults only. You must be 18 years or older to access this site.
                </p>
                <div className="space-y-4">
                    <button
                        onClick={() => {
                            localStorage.setItem('ageVerified', 'true');
                            window.location.reload();
                        }}
                        className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-full transition-all duration-200 transform hover:scale-105"
                    >
                        I am 18 years or older
                    </button>
                    <button
                        onClick={() => window.location.href = 'https://www.google.com'}
                        className="w-full bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-800 dark:text-white font-semibold py-3 px-6 rounded-full transition-all duration-200"
                    >
                        Exit Site
                    </button>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-6">
                    By entering this site, you confirm you are of legal age.
                </p>
            </div>
        </div>
    );
};

const AppContent: React.FC = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<PostsList />} />
                        <Route path="story/:id" element={<PostPage />} />
                        <Route path="upgrade" element={ <SubscriptionsPage /> } />
                        <Route path="submit-idea" element={ <SubmitIdeaPage /> } />
                        <Route path="schedule" element={ <WritingSchedulePage /> } />
                        <Route path="dashboard" element={ <LogsDashboard /> } />
                        <Route path="create-story/" element={
                            <ProtectedRoute children={<CreatePostPage />} requiredTier={999} />
                        } />
                        <Route path="about" element={<AboutPage />} />
                    </Route>
                </Routes>
            </Router>
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 4000,
                    //@ts-expect-error: nothing to see here
                    style: (theme) => ({
                        background: theme === 'dark'
                            ? 'rgba(31, 41, 55, 0.8)'
                            : 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        color: theme === 'dark' ? '#f3f4f6' : '#fff',
                        border: theme === 'dark'
                            ? '1px solid rgba(75, 85, 99, 0.3)'
                            : '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '12px',
                    }),
                    success: {
                        iconTheme: {
                            primary: '#ec4899',
                            secondary: '#fff',
                        },
                    },
                    error: {
                        iconTheme: {
                            primary: '#ef4444',
                            secondary: '#fff',
                        },
                    },
                }}
            />
        </AuthProvider>
    );
};

const App: React.FC = () => {
    const [isVerified, setIsVerified] = useState<boolean | null>(null);

    useEffect(() => {
        const ageVerified = localStorage.getItem('ageVerified') === 'true';
        setIsVerified(ageVerified);
    }, []);

    if (isVerified === null) {
        return (
            <ThemeProvider>
                <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-white font-medium">Loading...</p>
                    </div>
                </div>
            </ThemeProvider>
        );
    }

    return (
        <ThemeProvider>
            {!isVerified ? <AgeVerification /> : <AppContent />}
        </ThemeProvider>
    );
};

export default App;