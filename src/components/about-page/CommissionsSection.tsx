import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenNib, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

interface CommissionsSectionProps {
    mobile?: boolean;
}

const CommissionsSection: React.FC<CommissionsSectionProps> = ({ mobile = false }) => {
    const containerClass = mobile ? "mb-6" : "bg-gray-50 dark:bg-gray-800 rounded-2xl p-6";
    const iconSize = mobile ? "w-6 h-6" : "w-8 h-8";
    const titleSize = mobile ? "text-lg" : "text-xl";

    return (
        <section className={containerClass}>
            <div className="flex items-center gap-3 mb-4">
                <div className={`${iconSize} bg-red-500 rounded flex items-center justify-center`}>
                    <FontAwesomeIcon icon={faPenNib} className="text-white text-xs" />
                </div>
                <h3 className={`${titleSize} font-bold text-gray-900 dark:text-white`}>
                    Commissions
                </h3>
            </div>

            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
                <div className="flex items-center gap-2 mb-2">
                    <FontAwesomeIcon icon={faExclamationTriangle} className="text-yellow-500 text-sm" />
                    <span className="font-semibold text-gray-900 dark:text-white text-sm">Status: Closed</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    Currently not taking new commissions, but I'm always open to discuss your dark and twisted ideas.
                </p>
            </div>
        </section>
    );
};

export default CommissionsSection;