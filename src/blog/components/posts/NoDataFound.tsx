import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faInbox } from '@fortawesome/free-solid-svg-icons';

interface NoDataFoundProps {
    message?: string;
    subMessage?: string;
    icon?: 'search' | 'inbox';
    className?: string;
}

const NoDataFound = ({
                         message = "No data found",
                         subMessage = "Try adjusting your search or filter to find what you're looking for",
                         icon = 'inbox',
                         className = ""
                     }: NoDataFoundProps) => {
    const iconConfig = {
        search: faSearch,
        inbox: faInbox
    };

    return (
        <div className={`flex flex-col items-center justify-center py-12 px-4 text-center select-none ${className}`}>
            <div className="mb-6">
                <FontAwesomeIcon
                    icon={iconConfig[icon]}
                    className="text-mono-300 dark:text-mono-600 text-6xl"
                />
            </div>
            <h3 className="text-xl font-semibold text-mono-700 dark:text-mono-300 mb-2">
                {message}
            </h3>
            <p className="text-mono-500 dark:text-mono-400 max-w-md">
                {subMessage}
            </p>
        </div>
    );
};

export default NoDataFound;