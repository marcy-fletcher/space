import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEnvelope } from '@fortawesome/free-solid-svg-icons';

interface InviteHeaderProps {
    creating: boolean;
    onCreate: () => void;
}

const InviteHeader: React.FC<InviteHeaderProps> = ({ creating, onCreate }) => {
    return (
        <div className="flex items-center justify-between mb-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <FontAwesomeIcon icon={faEnvelope} className="w-6 h-6" />
                    Invite Keys
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Manage and share invite links
                </p>
            </div>
            <button
                onClick={onCreate}
                disabled={creating}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition flex items-center gap-2"
            >
                {creating ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                    <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
                )}
                Create Invite
            </button>
        </div>
    );
};

export default InviteHeader;