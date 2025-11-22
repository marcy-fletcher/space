// components/LogsFilters.tsx
import React from 'react';
import { LogFilters, LogType } from '../types/logs';

interface LogsFiltersProps {
    filters: LogFilters;
    onFiltersChange: (filters: LogFilters) => void;
}

const LogsFilters: React.FC<LogsFiltersProps> = ({ filters, onFiltersChange }) => {
    const logTypes: (LogType | 'all')[] = [
        'all',
        'authorization',
        'api_call',
        'system_event',
        'user_action',
        'error',
        'performance',
    ];

    const handleFilterChange = (key: keyof LogFilters, value: string) => {
        onFiltersChange({
            ...filters,
            [key]: value === '' ? undefined : value,
        });
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6 transition-all duration-200 hover:shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="space-y-2">
                    <label className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300">
                        <i className="fas fa-filter mr-2 text-gray-500 dark:text-gray-400 text-xs"></i>
                        Log Type
                    </label>
                    <select
                        value={filters.log_type || 'all'}
                        onChange={(e) => handleFilterChange('log_type', e.target.value)}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    >
                        {logTypes.map((type) => (
                            <option key={type} value={type}>
                                {type === 'all'
                                    ? 'All Types'
                                    : type.split('_').map(word =>
                                        word.charAt(0).toUpperCase() + word.slice(1)
                                    ).join(' ')
                                }
                            </option>
                        ))}
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300">
                        <i className="fas fa-calendar-alt mr-2 text-gray-500 dark:text-gray-400 text-xs"></i>
                        Date Range
                    </label>
                    <div className="flex space-x-2">
                        <input
                            type="date"
                            value={filters.date_from || ''}
                            onChange={(e) => handleFilterChange('date_from', e.target.value)}
                            className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                        <input
                            type="date"
                            value={filters.date_to || ''}
                            onChange={(e) => handleFilterChange('date_to', e.target.value)}
                            className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-2">
                    <label className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300">
                        <i className="fas fa-search mr-2 text-gray-500 dark:text-gray-400 text-xs"></i>
                        Search
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search action, message, or user..."
                            value={filters.search || ''}
                            onChange={(e) => handleFilterChange('search', e.target.value)}
                            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 pl-9 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                        <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs"></i>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex space-x-2">
                    <button
                        onClick={() => onFiltersChange({
                            log_type: undefined,
                            date_from: undefined,
                            date_to: undefined,
                            search: undefined,
                        })}
                        className="px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200"
                    >
                        <i className="fas fa-undo mr-1"></i>
                        Reset
                    </button>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                    {filters.search || filters.log_type || filters.date_from || filters.date_to ? 'Filters active' : 'No filters'}
                </div>
            </div>
        </div>
    );
};

export default LogsFilters;