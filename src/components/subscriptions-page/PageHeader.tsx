import React from 'react';

interface PageHeaderProps {
    title: string;
    subtitle: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => {
    return (
        <header className="text-center mb-12">
            <h1 className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text
                         bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600
                         dark:text-gray-100
                         mb-4 font-serif tracking-tight transition-all duration-500">
                {title}
            </h1>
            <p className="text-xl text-pink-600 dark:text-pink-200 font-light font-sans transition-colors duration-300">
                {subtitle}
            </p>
            <div className="mt-6 flex justify-center gap-2">
                <div className="w-16 h-1 bg-gradient-to-r from-transparent via-pink-400 dark:via-pink-500 to-transparent rounded-full transition-all duration-300"></div>
                <div className="w-1 h-1 bg-pink-400 dark:bg-pink-500 rounded-full mt-0 transition-all duration-300"></div>
                <div className="w-16 h-1 bg-gradient-to-r from-transparent via-pink-400 dark:via-pink-500 to-transparent rounded-full transition-all duration-300"></div>
            </div>
        </header>
    );
};

export default PageHeader;