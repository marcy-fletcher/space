import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes, faArrowRight } from '@fortawesome/free-solid-svg-icons';

interface SearchBarProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    onSearch?: () => void;
    onClear?: () => void;
    onKeyPress?: (e: React.KeyboardEvent) => void;
    placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
                                                 searchTerm,
                                                 onSearchChange,
                                                 onSearch,
                                                 onClear,
                                                 onKeyPress,
                                                 placeholder = "Search by title or #tag..."
                                             }) => {
    const handleClear = () => {
        onSearchChange('');
        onClear?.();
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            onSearch?.();
        }
        onKeyPress?.(e);
    };

    return (
        <div className="mb-12">
            <div className="relative max-w-2xl mx-auto">
                
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <FontAwesomeIcon
                        icon={faSearch}
                        className="w-4 h-4 text-gray-400 dark:text-gray-500 transition-colors duration-300"
                    />
                </div>

                <input
                    type="text"
                    placeholder={placeholder}
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-12 pr-24 py-4 bg-white dark:bg-gray-800 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl
                             focus:outline-none focus:border-primary-500 dark:focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20
                             transition-all duration-300 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500
                             shadow-sm hover:shadow-md font-sans text-base"
                />

                {searchTerm && (
                    <button
                        onClick={handleClear}
                        className="absolute right-20 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600
                                 dark:text-gray-500 dark:hover:text-gray-300 transition-colors duration-200"
                        aria-label="Clear search"
                    >
                        <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
                    </button>
                )}

                <button
                    onClick={onSearch}
                    disabled={!searchTerm.trim()}
                    className={`absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 rounded-lg font-medium transition-all duration-300
                              ${searchTerm.trim()
                        ? 'bg-primary-500 hover:bg-primary-600 text-white shadow-md hover:shadow-lg cursor-pointer'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                    }`}
                    aria-label="Search"
                >
                    <FontAwesomeIcon
                        icon={faArrowRight}
                        className="w-4 h-4"
                    />
                </button>
            </div>
        </div>
    );
};

export default SearchBar;