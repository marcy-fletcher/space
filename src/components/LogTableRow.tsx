import React, { useState } from 'react';
import { CompactLogs } from "./LogsDashboard.tsx";

interface LogTableRowProps {
    log: CompactLogs;
    onRowClick?: (log: CompactLogs) => void;
}

const LogTableRow: React.FC<LogTableRowProps> = ({ log, onRowClick }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleClick = () => {
        setIsExpanded(!isExpanded);
        onRowClick?.(log);
    };

    const getLogTypeBadge = (type: string) => {
        const colors = {
            authorization: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-800',
            api_call: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border border-green-200 dark:border-green-800',
            system_event: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 border border-purple-200 dark:border-purple-800',
            user_action: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border border-amber-200 dark:border-amber-800',
            error: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border border-red-200 dark:border-red-800',
            performance: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800',
        };

        return (
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
            }`}>
                <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                    type === 'error' ? 'bg-red-500' :
                        type === 'authorization' ? 'bg-blue-500' :
                            type === 'api_call' ? 'bg-green-500' :
                                type === 'user_action' ? 'bg-amber-500' :
                                    type === 'system_event' ? 'bg-purple-500' :
                                        type === 'performance' ? 'bg-indigo-500' : 'bg-gray-500'
                }`}></span>
                {type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </span>
        );
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const isToday = date.toDateString() === now.toDateString();

        return (
            <div className="flex flex-col space-y-0.5">
                <span className="text-xs font-medium text-gray-900 dark:text-white">
                    {isToday ? 'Today' : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                    {date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
                </span>
            </div>
        );
    };

    const truncateText = (text: string, maxLength: number) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    return (
        <>
            <tr
                className={`group hover:bg-gray-50 dark:hover:bg-gray-700/20 transition-colors duration-150 cursor-pointer ${
                    isExpanded ? 'bg-blue-50 dark:bg-blue-900/10' : ''
                }`}
                onClick={handleClick}
            >
                <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                        {/* Expanded/Unexpanded Indicator */}
                        <div className={`transform transition-transform duration-200 ${
                            isExpanded ? 'rotate-90 text-blue-600 dark:text-blue-400' : 'text-gray-400'
                        }`}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                        {getLogTypeBadge(log.logType)}
                    </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-sm text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md font-medium">
                        {log.action}
                    </span>
                </td>
                <td className="px-4 py-3 max-w-[200px] 2xl:max-w-[300px]">
                    <div className={`text-sm text-gray-600 dark:text-gray-300 transition-all duration-200 leading-relaxed ${
                        isExpanded ? 'whitespace-normal break-words' : 'truncate'
                    }`}>
                        {log.message}
                        {!isExpanded && (
                            <span className="text-blue-500 dark:text-blue-400 text-xs ml-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                (click to expand)
                            </span>
                        )}
                    </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                    {log.username ? (
                        <span className="font-mono text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                            {log.username}
                        </span>
                    ) : (
                        <span className="text-gray-400 dark:text-gray-500 text-xs">-</span>
                    )}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                    {formatDate(log.createdAt)}
                </td>
            </tr>

            {/* Expanded row details */}
            {isExpanded && (
                <tr className="bg-blue-50 dark:bg-blue-900/10 border-t border-blue-100 dark:border-blue-800">
                    <td colSpan={5} className="px-4 py-3">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            {/* Session ID */}
                            <div className="space-y-1">
                                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                    Session ID
                                </label>
                                <div className="font-mono text-xs text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 p-2 rounded border border-gray-200 dark:border-gray-700 break-all">
                                    {log.sessionId || (
                                        <span className="text-gray-400 dark:text-gray-500">-</span>
                                    )}
                                </div>
                            </div>

                            {/* IP Address */}
                            <div className="space-y-1">
                                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                    IP Address
                                </label>
                                <div className="font-mono text-xs text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 p-2 rounded border border-gray-200 dark:border-gray-700">
                                    {log.ipAddress || (
                                        <span className="text-gray-400 dark:text-gray-500">-</span>
                                    )}
                                </div>
                            </div>

                            {/* User Agent */}
                            <div className="space-y-1">
                                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                    User Agent
                                </label>
                                <div className="text-xs text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 p-2 rounded border border-gray-200 dark:border-gray-700 break-all">
                                    {log.userAgent ? (
                                        <span title={log.userAgent}>
                                            {truncateText(log.userAgent, 80)}
                                        </span>
                                    ) : (
                                        <span className="text-gray-400 dark:text-gray-500">-</span>
                                    )}
                                </div>
                            </div>

                            {/* Additional Data (if available) */}
                            {log.additionalData && Object.keys(log.additionalData).length > 0 && (
                                <div className="md:col-span-3 space-y-1">
                                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                        Additional Data
                                    </label>
                                    <pre className="text-xs text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 p-2 rounded border border-gray-200 dark:border-gray-700 overflow-x-auto">
                                        {JSON.stringify(log.additionalData, null, 2)}
                                    </pre>
                                </div>
                            )}
                        </div>
                    </td>
                </tr>
            )}
        </>
    );
};

export default LogTableRow;