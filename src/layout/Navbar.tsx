import React from 'react';
import { cn } from "../utils/cn.ts";

interface NavbarProps {
    className?: string;
    children?: React.ReactNode;
}

const Navbar = ({ children, className }: NavbarProps) => {
    return (
        <header
            className={cn(
                "relative z-50 bg-white/90 dark:bg-mono-900/90 backdrop-blur-md border-b border-white/30 dark:border-mono-700/30 shadow-lg",
                className
            )}
        >
            <div className="w-full px-4 sm:px-6 py-2">
                {children}
            </div>
        </header>
    );
};

export default Navbar;
