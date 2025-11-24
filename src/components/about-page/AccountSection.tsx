import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey } from "@fortawesome/free-solid-svg-icons";

interface AccountSectionProps {
    mobile?: boolean;
}

const AccountSection: React.FC<AccountSectionProps> = ({ mobile = false }) => {
    const containerClass = mobile ? "mb-8" : "bg-gray-50 dark:bg-gray-800 rounded-2xl p-6";
    const iconSize = mobile ? "w-6 h-6" : "w-8 h-8";
    const titleSize = mobile ? "text-lg" : "text-xl";

    return (
        <section className={containerClass}>
            <div className="flex items-center gap-3 mb-4">
                <div className={`${iconSize} bg-green-500 rounded flex items-center justify-center`}>
                    <FontAwesomeIcon icon={faKey} className="text-white text-xs" />
                </div>
                <h3 className={`${titleSize} font-bold text-gray-900 dark:text-white`}>
                    How Can I Get an Account?
                </h3>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    You can contact me through any available channel, and we'll discuss our options. In the end, what kind of devil would I be if I didn't try to make a deal?
                </p>
            </div>
        </section>
    );
};

export default AccountSection;