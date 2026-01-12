import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faTimes} from "@fortawesome/free-solid-svg-icons";
import {cn} from "../../utils/cn.ts";

interface HamburgerButtonProps {
    isOpen: boolean;
    onClick: () => void;
    className?: string;
}

const HamburgerButton = ({onClick, isOpen, className}: HamburgerButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={cn("p-2 rounded-lg text-mono-700 dark:text-mono-300 hover:bg-mono-100 dark:hover:bg-mono-800", className)}
        >
            <FontAwesomeIcon
                icon={isOpen ? faTimes : faBars}
                className="w-5 h-5"
            />
        </button>
    );
};

export default HamburgerButton;