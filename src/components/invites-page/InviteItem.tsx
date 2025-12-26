import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCopy,
    faHourglassEnd,
    faUser,
    faCheckCircle,
    faClock,
    faKey,
    faCalendarCheck,
    faCalendarAlt
} from '@fortawesome/free-solid-svg-icons';
import { Invite } from "../../types/invite.ts";

interface InviteItemProps {
    invite: Invite;
    onCopy: (key: string) => void;
    onExpire: (key: string) => void;
    isLast: boolean;
}

const InviteItem: React.FC<InviteItemProps> = ({ invite, onCopy, onExpire, isLast }) => {
    const isExpired = new Date(invite.expiresAt).getTime() < Date.now();
    const used = !!invite.usedAt;
    const userName = invite.userName;

    const statusConfig = {
        used: {
            text: 'Used',
            icon: faCheckCircle,
            color: 'text-green-600 dark:text-green-400',
            bgColor: 'bg-green-50 dark:bg-green-900/20',
            borderColor: 'border-green-200 dark:border-green-800'
        },
        expired: {
            text: 'Expired',
            icon: faHourglassEnd,
            color: 'text-amber-600 dark:text-amber-400',
            bgColor: 'bg-amber-50 dark:bg-amber-900/20',
            borderColor: 'border-amber-200 dark:border-amber-800'
        },
        active: {
            text: 'Active',
            icon: faClock,
            color: 'text-blue-600 dark:text-blue-400',
            bgColor: 'bg-blue-50 dark:bg-blue-900/20',
            borderColor: 'border-blue-200 dark:border-blue-800'
        }
    };

    const config = used ? statusConfig.used : isExpired ? statusConfig.expired : statusConfig.active;

    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);
        return {
            date: date.toLocaleDateString(undefined, { month: 'numeric', day: 'numeric', year: '2-digit' }), // e.g., "12/25/24"
            time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
    };

    const expiresAt = formatDateTime(invite.expiresAt);
    const usedAt = invite.usedAt ? formatDateTime(invite.usedAt) : null;

    return (
        <>
            {/* Mobile card */}
            <div className="lg:hidden">
                <div className={`p-5 ${isLast ? '' : 'border-b border-gray-100 dark:border-gray-800'}`}>
                    {/* Header with key and status */}
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-2 min-w-0">
                            <div className="p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
                                <FontAwesomeIcon icon={faKey} className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                            </div>
                            <code className="font-mono text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                                {invite.key}
                            </code>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${config.bgColor} ${config.color}`}>
                            {config.text}
                        </div>
                    </div>

                    {/* User info */}
                    <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                                <FontAwesomeIcon icon={faUser} className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-0.5">Used By</p>
                                <p className="text-gray-900 dark:text-gray-100 font-medium truncate">
                                    {userName || 'Not used'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Date info */}
                    <div className="grid grid-cols-2 gap-4 mb-5">
                        <div>
                            <div className="flex items-center gap-2 mb-1.5">
                                <FontAwesomeIcon icon={faCalendarAlt} className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                                <span className="text-xs text-gray-500 dark:text-gray-400">Expires</span>
                            </div>
                            <div>
                                <p className="text-gray-900 dark:text-gray-100 font-medium text-sm">{expiresAt.date}</p>
                                <p className="text-gray-500 dark:text-gray-400 text-xs">{expiresAt.time}</p>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center gap-2 mb-1.5">
                                <FontAwesomeIcon icon={faCalendarCheck} className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                                <span className="text-xs text-gray-500 dark:text-gray-400">Used At</span>
                            </div>
                            {usedAt ? (
                                <div>
                                    <p className="text-gray-900 dark:text-gray-100 font-medium text-sm">{usedAt.date}</p>
                                    <p className="text-gray-500 dark:text-gray-400 text-xs">{usedAt.time}</p>
                                </div>
                            ) : (
                                <p className="text-gray-500 dark:text-gray-400 text-sm italic">Not used</p>
                            )}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                        {!used && !isExpired ? (
                            <div className="flex gap-3">
                                <button
                                    onClick={() => onCopy(invite.key)}
                                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900"
                                >
                                    <FontAwesomeIcon icon={faCopy} className="w-4 h-4" />
                                    Copy
                                </button>
                                <button
                                    onClick={() => onExpire(invite.key)}
                                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-900"
                                >
                                    <FontAwesomeIcon icon={faHourglassEnd} className="w-4 h-4" />
                                    Expire
                                </button>
                            </div>
                        ) : (
                            <div className="text-center py-2">
                                <p className="text-gray-400 dark:text-gray-500 text-sm">No actions available</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Desktop row */}
            <div className="hidden lg:grid grid-cols-12 gap-4 items-center px-6 py-4 hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-colors">
                {/* Key */}
                <div className="col-span-3">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
                            <FontAwesomeIcon icon={faKey} className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        </div>
                        <div className="min-w-0">
                            <code className="font-mono text-sm font-medium text-gray-900 dark:text-gray-100 truncate block">
                                {invite.key}
                            </code>
                            <span className="text-xs text-gray-500 dark:text-gray-400">Click copy to use</span>
                        </div>
                    </div>
                </div>

                {/* Status */}
                <div className="col-span-2">
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${config.bgColor} ${config.color}`}>
                        <FontAwesomeIcon icon={config.icon} className="w-3.5 h-3.5" />
                        {config.text}
                    </div>
                </div>

                {/* User */}
                <div className="col-span-2">
                    {userName ? (
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                                <FontAwesomeIcon icon={faUser} className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <span className="text-gray-900 dark:text-gray-100 font-medium truncate">{userName}</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                            <div className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                <FontAwesomeIcon icon={faUser} className="w-4 h-4" />
                            </div>
                            <span className="text-sm">Not used</span>
                        </div>
                    )}
                </div>

                {/* Expires At */}
                <div className="col-span-2">
                    <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faCalendarAlt} className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                        <div>
                            <p className="text-gray-900 dark:text-gray-100 font-medium text-sm">{expiresAt.date}</p>
                            <p className="text-gray-500 dark:text-gray-400 text-xs">{expiresAt.time}</p>
                        </div>
                    </div>
                </div>

                {/* Used At */}
                <div className="col-span-2">
                    {usedAt ? (
                        <div className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faCalendarCheck} className="w-4 h-4 text-green-600 dark:text-green-400" />
                            <div>
                                <p className="text-gray-900 dark:text-gray-100 font-medium text-sm">{usedAt.date}</p>
                                <p className="text-gray-500 dark:text-gray-400 text-xs">{usedAt.time}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                            <FontAwesomeIcon icon={faCalendarCheck} className="w-4 h-4" />
                            <span className="text-sm italic">Not used</span>
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="col-span-1">
                    <div className="flex justify-end gap-2">
                        {!used && !isExpired ? (
                            <>
                                <button
                                    onClick={() => onCopy(invite.key)}
                                    className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900"
                                    title="Copy invite key"
                                >
                                    <FontAwesomeIcon icon={faCopy} className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => onExpire(invite.key)}
                                    className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-900"
                                    title="Expire this invite"
                                >
                                    <FontAwesomeIcon icon={faHourglassEnd} className="w-4 h-4" />
                                </button>
                            </>
                        ) : (
                            <span className="text-sm text-gray-400 dark:text-gray-500 px-3 py-2">—</span>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default InviteItem;