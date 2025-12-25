import React from 'react';

const WarningNote: React.FC = () => {
    return (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <p className="text-yellow-800 dark:text-yellow-200 font-sans text-sm">
                <strong>Important Note:</strong> The presence of certain themes, characters, or actions in my works does not mean that I support, approve of, or promote them. Everything presented is fictional or a creative interpretation intended for entertainment purposes only.
            </p>
        </div>
    );
};

export default WarningNote;