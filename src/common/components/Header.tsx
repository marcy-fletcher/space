import React from 'react';
import {cn} from "../../utils/cn.ts";

interface HeaderProps {
    className?: string;
    children: React.ReactNode;
}

const Header = ({children, className}: HeaderProps) => {
    return (
        <h1 className={cn("text-xl font-bold text-mono-800 dark:text-mono-100", className)}>
            {children}
        </h1>
    );
};

export default Header;