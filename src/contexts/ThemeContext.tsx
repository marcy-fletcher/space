import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

interface ThemeProviderProps {
    children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {

    const getInitialTheme = (): Theme => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light' || savedTheme === 'dark') {
            return savedTheme;
        }

        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        
        return 'light';
    };

    const [theme, setThemeState] = useState<Theme>(getInitialTheme);

    const applyTheme = (newTheme: Theme) => {
        const root = document.documentElement;
        
        if (newTheme === 'dark') {
            root.classList.add('dark');
            root.classList.remove('light');
        } else {
            root.classList.add('light');
            root.classList.remove('dark');
        }
        
        localStorage.setItem('theme', newTheme);
        setThemeState(newTheme);
    };

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        applyTheme(newTheme);
    };

    const setTheme = (newTheme: Theme) => {
        applyTheme(newTheme);
    };

    useEffect(() => {
        applyTheme(theme);

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e: MediaQueryListEvent) => {
            const savedTheme = localStorage.getItem('theme');
            if (!savedTheme) {
                applyTheme(e.matches ? 'dark' : 'light');
            }
        };
        
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};