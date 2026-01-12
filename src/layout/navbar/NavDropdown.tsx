import {useState, useRef, useEffect, type ReactNode} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-common-types";
import Card from "../Card.tsx";

interface NavDropdownProps {
    title: string;
    icon?: IconDefinition;
    children: ReactNode;
}

const NavDropdown = ({ title, icon, children }: NavDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <div className="flex items-center gap-2 rounded text-base font-medium cursor-pointer text-mono-700 dark:text-mono-300 hover:text-primary-600 dark:hover:text-primary-400"
                 onClick={toggleDropdown}>
                {icon && <FontAwesomeIcon icon={icon} className="w-4 h-4" />}
                {title}
                <FontAwesomeIcon
                    icon={isOpen ? "chevron-up" : "chevron-down"}
                    className="w-3 h-3 ml-1"
                />
            </div>

            {isOpen && (
                <Card className="absolute left-0 mt-2 w-52 px-3 py-3 rounded-xl flex flex-col gap-2">
                    {children}
                </Card>
            )}
        </div>
    );
};

export default NavDropdown;
