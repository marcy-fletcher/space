import React from 'react';

const StoryFooter: React.FC = () => {
    return (
        <footer className="mt-12 pt-8 border-t-2 border-primary-100 dark:border-gray-700">
            <div className="flex justify-center gap-2 mb-6">
                <div className="w-2 h-2 bg-primary-400 dark:bg-primary-600 rounded-full"></div>
                <div className="w-2 h-2 bg-primary-300 dark:bg-primary-500 rounded-full"></div>
                <div className="w-2 h-2 bg-primary-400 dark:bg-primary-600 rounded-full"></div>
            </div>
            <p className="text-center text-gray-500 dark:text-gray-400 font-sans italic mb-6">
                The End
            </p>
        </footer>
    );
};

export default StoryFooter;