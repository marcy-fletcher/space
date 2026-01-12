import {cn} from "../../utils/cn.ts";
import type {ReactNode} from "react";

interface MobileMenuProps {
    children?: ReactNode;
    isOpen: boolean;
    className?: string;
}

const MobileMenu = ({children, isOpen, className}: MobileMenuProps) => {
    return (
        <div className={cn(`transition-all duration-300 ease-in-out`,
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden', className)}>
            <div className="py-4 border-t border-mono-200 dark:border-mono-700 mt-4">
                {children}
            </div>
        </div>
    );
};

export default MobileMenu;