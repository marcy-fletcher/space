import React from 'react';
import { CompactLogs } from "./LogsDashboard.tsx";
import { LogType } from "../types/logs.ts";

interface LogsStatsProps {
    logs: CompactLogs[];
}

const LogsStats: React.FC<LogsStatsProps> = ({ logs }) => {
    const getLogTypeCount = (type: LogType) =>
        logs.filter(log => log.logType === type).length;

    const stats = [
        {
            label: 'Total Logs',
            value: logs.length,
            icon: 'fa-list',
            color: 'text-gray-600 dark:text-gray-400',
            bgColor: 'bg-gray-100 dark:bg-gray-700',
            gradient: 'from-gray-500 to-gray-600',
        },
        {
            label: 'Errors',
            value: getLogTypeCount('error'),
            icon: 'fa-exclamation-triangle',
            color: 'text-red-600 dark:text-red-400',
            bgColor: 'bg-red-100 dark:bg-red-900/30',
            gradient: 'from-red-500 to-red-600',
        },
        {
            label: 'API Calls',
            value: getLogTypeCount('api_call'),
            icon: 'fa-exchange-alt',
            color: 'text-green-600 dark:text-green-400',
            bgColor: 'bg-green-100 dark:bg-green-900/30',
            gradient: 'from-green-500 to-green-600',
        },
        {
            label: 'User Actions',
            value: getLogTypeCount('user_action'),
            icon: 'fa-user',
            color: 'text-amber-600 dark:text-amber-400',
            bgColor: 'bg-amber-100 dark:bg-amber-900/30',
            gradient: 'from-amber-500 to-amber-600',
        },
    ];

    return (
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 mb-6">
            {stats.map((stat, index) => (
                <div
                    key={index}
                    className="group relative bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 overflow-hidden"
                >
                    {/* Minimal accent line */}
                    <div className={`absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r ${stat.gradient}`}></div>

                    <div className="p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className={`p-2 rounded-lg ${stat.bgColor} ${stat.color} transition-all duration-200 group-hover:scale-110`}>
                                    <i className={`fas ${stat.icon} text-sm`}></i>
                                    {/* Alert dot for errors */}
                                    {stat.label === 'Errors' && stat.value > 0 && (
                                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                                    )}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 truncate">
                                        {stat.label}
                                    </p>
                                    <p className="text-xl font-bold text-gray-900 dark:text-white truncate">
                                        {stat.value.toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Compact progress indicator */}
                        <div className="mt-3">
                            <div className="flex items-center justify-between text-xs mb-1">
                                <span className="text-gray-500 dark:text-gray-400">Progress</span>
                                <span className="font-medium text-gray-700 dark:text-gray-300">
                                    {logs.length > 0 ? ((stat.value / logs.length) * 100).toFixed(0) : 0}%
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                                <div
                                    className={`h-1.5 rounded-full bg-gradient-to-r ${stat.gradient} transition-all duration-700 ease-out`}
                                    style={{
                                        width: `${logs.length > 0 ? (stat.value / logs.length) * 100 : 0}%`
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LogsStats;