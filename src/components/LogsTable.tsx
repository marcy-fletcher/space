import React, { useState, useMemo } from 'react';
import { CompactLogs } from "./LogsDashboard.tsx";
import LogTableRow from './LogTableRow';

interface LogsTableProps {
    logs: CompactLogs[];
    loading: boolean;
    onRefresh: () => void;
    onRowClick?: (log: CompactLogs) => void;
}

const LogsTable: React.FC<LogsTableProps> = ({ logs, loading, onRefresh, onRowClick }) => {
    const [selectedUser, setSelectedUser] = useState<string>('all');

    // Get unique users from logs
    const uniqueUsers = useMemo(() => {
        const users = new Set(logs.map(log => log.username || 'Unknown'));
        return ['all', ...Array.from(users)].sort();
    }, [logs]);

    // Filter logs based on selected user
    const filteredLogs = useMemo(() => {
        if (selectedUser === 'all') {
            return logs;
        }
        return logs.filter(log => log.username === selectedUser);
    }, [logs, selectedUser]);

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
                            {filteredLogs.length} / {logs.length}
                        </span>
                    </div>
                    <div className="flex items-center space-x-3">
                        {/* User Filter Dropdown */}
                        <div className="flex items-center space-x-2">
                            <label htmlFor="user-filter" className="text-xs font-medium text-gray-600 dark:text-gray-400">
                                User:
                            </label>
                            <select
                                id="user-filter"
                                value={selectedUser}
                                onChange={(e) => setSelectedUser(e.target.value)}
                                className="inline-flex items-center px-3 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-xs font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-200"
                            >
                                {uniqueUsers.map(user => (
                                    <option key={user} value={user}>
                                        {user === 'all' ? 'All Users' : user}
                                    </option>
                                ))}
                            </select>
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
                    {filteredLogs.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="px-4 py-8 text-center">
                                <div className="flex flex-col items-center justify-center text-gray-400 dark:text-gray-500">
                                    <i className="fas fa-inbox text-2xl mb-2 opacity-50"></i>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                                        {selectedUser === 'all' ? 'No logs found' : `No logs found for user: ${selectedUser}`}
                                    </p>
                                    <p className="text-xs text-gray-400 dark:text-gray-500">
                                        {selectedUser === 'all'
                                            ? 'Logs will appear here as they are generated'
                                            : 'Try selecting a different user or clear the filter'
                                        }
                                    </p>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        filteredLogs.map((log) => (
                            <LogTableRow
                                key={log.id}
                                log={log}
                                onRowClick={onRowClick}
                            />
                        ))
                    )}
                    </tbody>
                </table>
            </div>

            {filteredLogs.length > 0 && (
                <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30">
                    <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                        <span>
                            Showing {filteredLogs.length} of {logs.length} entries
                            {selectedUser !== 'all' && ` for user: ${selectedUser}`}
                        </span>
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