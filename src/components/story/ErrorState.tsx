import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ErrorStateProps {
    error: string;
    isStoryUnavailable: boolean;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error, isStoryUnavailable }) => {
    const navigate = useNavigate();
    console.error(error);

    return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
            <div className="text-center">
                <div className="text-6xl mb-6">📖</div>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4 font-serif">
                    {isStoryUnavailable ? 'Story Unavailable' : 'Story Not Found'}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8 font-sans">
                    {isStoryUnavailable
                        ? 'This story is currently unavailable or under review.'
                        : 'This story doesn\'t exist or has been removed.'}
                </p>
                <button
                    onClick={() => navigate('/')}
                    className="bg-gradient-to-r from-primary-500 to-primary-600
                             hover:from-primary-600 hover:to-primary-700
                             text-white font-semibold py-3 px-8 rounded-xl
                             transition-all duration-300 shadow-md hover:shadow-xl
                             transform hover:-translate-y-1 font-sans"
                >
                    Back to Stories
                </button>
            </div>
        </div>
    );
};

export default ErrorState;