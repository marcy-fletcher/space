import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { cn } from "../../utils/cn.ts";
import { useEffect, useState } from "react";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

interface NavLinkProps {
    to: string;
    title: string;
    icon?: IconDefinition;
}

const NavLink = ({ title, to, icon }: NavLinkProps) => {
    const [clicked, setClicked] = useState(false);
    const [loading, setLoading] = useState(false); // State to track loading
    const location = useLocation();

    const isActive =
        location.pathname === to || (to !== "/" && location.pathname.startsWith(to));

    const baseClasses =
        "flex items-center gap-2 whitespace-nowrap rounded text-base font-medium";

    const activeClasses = "text-primary-600 dark:text-primary-400";
    const inactiveClasses =
        "text-mono-700 dark:text-mono-300 hover:text-primary-600 dark:hover:text-primary-400";

    useEffect(() => {
        async function reset() {
            setClicked(false);
            setLoading(false);
        }

        reset();
    }, [location.pathname]);

    const handleClick = () => {
        if (isActive)
            return;

        setClicked(true);

        const timer = setTimeout(() => {
            setLoading(true);
        }, 500);

        return () => clearTimeout(timer);
    };

    return (
        <Link
            to={to}
            onClick={handleClick}
            className={cn(baseClasses, isActive ? activeClasses : inactiveClasses)}
        >
            {loading && clicked ? (
                <div>
                    <FontAwesomeIcon icon={faSpinner} spin />
                </div>
            ) : icon ? (
                <div>
                    <FontAwesomeIcon icon={icon} />
                </div>
            ) : null}
            {title}
        </Link>
    );
};

export default NavLink;