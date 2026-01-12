import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSun, faMoon} from '@fortawesome/free-solid-svg-icons';
import {useTheme} from "../../common/hooks/useTheme.ts";

const ThemeToggle: React.FC = () => {
    const {theme, toggleTheme} = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="relative inline-flex items-center justify-center w-12 h-6 bg-mono-200 dark:bg-mono-700 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-mono-800 hover:shadow-lg group"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
        >
            <div
                className="absolute inset-0 rounded-full bg-linear-to-r from-blue-100 to-shade-100 dark:from-mono-600 dark:to-mono-800 transition-all duration-300"></div>

            <div
                className={`absolute left-0.5 w-5 h-5 bg-white dark:bg-mono-300 rounded-full shadow-md transition-all duration-300 transform ${
                    theme === 'dark' ? 'translate-x-6' : 'translate-x-0'
                } flex items-center justify-center`}
            >
                <FontAwesomeIcon
                    icon={faSun}
                    className={`absolute text-yellow-500 w-3 h-3 transition-all duration-300 ${
                        theme === 'light' ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'
                    }`}
                />
                <FontAwesomeIcon
                    icon={faMoon}
                    className={`absolute text-blue-400 w-3 h-3 transition-all duration-300 ${
                        theme === 'dark' ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'
                    }`}
                />
            </div>
        </button>
    );
};

export default ThemeToggle;