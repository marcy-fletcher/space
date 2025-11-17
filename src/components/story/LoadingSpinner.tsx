import React from 'react';

const LoadingSpinner: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-pink-200 dark:border-pink-800 border-t-pink-500 dark:border-t-pink-600 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600 dark:text-gray-300 font-medium">Loading...</p>
            </div>
        </div>
    );
};

export default LoadingSpinner;