import React from 'react';
import InviteItem from './InviteItem';
import { Invite } from "../../types/invite.ts";

interface InviteTableProps {
    invites: Invite[];
    loading: boolean;
    onCopy: (key: string) => void;
    onExpire: (key: string) => void;
}

const InviteTable: React.FC<InviteTableProps> = ({ invites, loading, onCopy, onExpire }) => {
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 dark:border-indigo-400"></div>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Loading invites...</p>
            </div>
        );
    }

    if (invites.length === 0) {
        return (
            <div className="text-center py-12 px-4">
                <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </div>
                <h3 className="text-gray-900 dark:text-gray-100 font-medium text-lg mb-2">No invite keys created yet</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm max-w-sm mx-auto">
                    Create your first invite key to start inviting users to your platform.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            {/* Desktop header */}
            <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
                <div className="col-span-3 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Key
                </div>
                <div className="col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Status
                </div>
                <div className="col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Used By
                </div>
                <div className="col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Expires
                </div>
                <div className="col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Used At
                </div>
                <div className="col-span-1 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider text-right">
                    Actions
                </div>
            </div>

            {/* Invites list */}
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {invites.map((invite, index) => (
                    <InviteItem
                        key={invite.key}
                        invite={invite}
                        onCopy={onCopy}
                        onExpire={onExpire}
                        isLast={index === invites.length - 1}
                    />
                ))}
            </div>
        </div>
    );
};

export default InviteTable;