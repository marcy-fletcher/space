import React from 'react';
import { CompactLogs } from "./LogsDashboard.tsx";

interface LogsTableProps {
    logs: CompactLogs[];
    loading: boolean;
    onRefresh: () => void;
}

const LogsTable: React.FC<LogsTableProps> = ({ logs, loading, onRefresh }) => {
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

    if (loading) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex justify-center items-center space-x-2">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                    <span className="text-gray-600 dark:text-gray-400 text-sm font-medium">Loading logs...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Compact Header */}
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Logs</h2>
                        <span className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-md text-xs font-medium">
                            {logs.length}
                        </span>
                    </div>
                    <button
                        onClick={onRefresh}
                        disabled={loading}
                        className="inline-flex items-center px-3 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-xs font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <i className="fas fa-sync-alt mr-1.5 text-blue-500 text-xs"></i>
                        Refresh
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700/30">
                    <tr>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                            Type
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                            Action
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                            Message
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                            User
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                            Time
                        </th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {logs.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="px-4 py-8 text-center">
                                <div className="flex flex-col items-center justify-center text-gray-400 dark:text-gray-500">
                                    <i className="fas fa-inbox text-2xl mb-2 opacity-50"></i>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">No logs found</p>
                                    <p className="text-xs text-gray-400 dark:text-gray-500">Logs will appear here as they are generated</p>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        logs.map((log) => (
                            <tr
                                key={log.id}
                                className="group hover:bg-gray-50 dark:hover:bg-gray-700/20 transition-colors duration-150 cursor-pointer"
                            >
                                <td className="px-4 py-3 whitespace-nowrap">
                                    {getLogTypeBadge(log.logType)}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                    <span className="text-sm text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md font-medium">
                                        {log.action}
                                    </span>
                                </td>
                                <td className="px-4 py-3 max-w-[200px] 2xl:max-w-[300px]">
                                    <div className="text-sm text-gray-600 dark:text-gray-300 truncate group-hover:text-clip group-hover:whitespace-normal transition-all duration-200 leading-relaxed">
                                        {log.message}
                                    </div>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                    {log.username ? (
                                        <div className="flex items-center space-x-2">
                                            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs font-medium text-white flex-shrink-0">
                                                {log.username.substring(0, 2).toUpperCase()}
                                            </div>
                                            <span className="font-mono text-xs text-gray-600 dark:text-gray-400 truncate max-w-[80px]">
                                                {log.username}
                                            </span>
                                        </div>
                                    ) : (
                                        <span className="text-gray-400 dark:text-gray-500 text-xs">-</span>
                                    )}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                    {formatDate(log.createdAt)}
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>

            {/* Compact Footer */}
            {logs.length > 0 && (
                <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30">
                    <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                        <span>Showing {logs.length} entries</span>
                        <span className="flex items-center space-x-1">
                            <i className="fas fa-clock text-xs"></i>
                            <span>Just now</span>
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LogsTable;