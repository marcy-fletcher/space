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
import SchedulePage from "./pages/SchedulePage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import AgeVerification from "./components/AgeVerification.tsx";
import VisitTracker from "./components/VisitTracker.tsx";
import ReactionsListPage from "./pages/ReactionsListPage.tsx";

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
                        <Route path="register" element={ <RegisterPage /> } />
                        <Route path="login" element={ <LoginPage /> } />
                        <Route path="track" element={<VisitTracker />} />
                        <Route path="reactions" element={
                            <ProtectedRoute children={<ReactionsListPage />} requiredTier={999} />
                        } />
                        <Route path="create-story" element={
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