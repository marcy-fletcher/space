import React from 'react';

interface SearchBarProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange }) => {
    return (
        <div className="mb-12">
            <div className="relative max-w-2xl mx-auto">
                <svg
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-400 dark:text-primary-500 transition-colors duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
                <input
                    type="text"
                    placeholder="Search by title or tags..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-primary-200 dark:border-gray-600 rounded-2xl 
                             focus:outline-none focus:border-primary-400 dark:focus:border-primary-500 focus:ring-4 focus:ring-primary-100 dark:focus:ring-primary-900/30
                             transition-all duration-300 text-gray-800 dark:text-gray-100 placeholder-primary-300 dark:placeholder-gray-500
                             shadow-lg hover:shadow-xl font-sans"
                />
            </div>
        </div>
    );
};

export default SearchBar;
