// components/LogsDashboard.tsx
import React, { useState, useEffect } from 'react';
import { LogEntry, LogFilters } from '../types/logs';
import LogsTable from './LogsTable';
import LogsStats from './LogsStats';
import {supabase} from "../services/supabase.ts";
import LogsFilters from "./LogFilters.tsx";
import LogsTrendChart from "./LogsTrendChart.tsx";
import { useAuth } from '../contexts/AuthContext';
import RestrictedAccessMessage from "./RestrictedAccessMessage.tsx"; // Adjust import path as needed

export interface CompactLogs {
    id: LogEntry['id'];
    action: LogEntry['action'];
    logType: LogEntry['log_type'];
    message: LogEntry['message'];
    username?: string;
    createdAt: string;
}

interface LogsDto {
    id: LogEntry['id'];
    action: LogEntry['action'];
    log_type: LogEntry['log_type'];
    message: LogEntry['message'];
    created_at: string;
    user_profiles: {
        name: string;
    }
}

function convertToCompact(dto: LogsDto) : CompactLogs {
    return {
        id: dto.id,
        action: dto.action,
        logType: dto.log_type,
        message: dto.message,
        username: dto.user_profiles?.name,
        createdAt: dto.created_at
    }
}

const LogsDashboard: React.FC = () => {
    const { user } = useAuth();
    const [logs, setLogs] = useState<CompactLogs[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState<LogFilters>({
        log_type: 'all',
        search: '',
    });

    const isAuthorizedUser = user?.id === '9c9deca4-1ec0-45b6-99e9-e4bd59814d0d';

    const fetchLogs = async () => {
        // Don't fetch logs if user is not authorized
        if (!isAuthorizedUser) {
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);

            let query = supabase
                .from('logs')
                .select(`
                id,
                action,
                log_type,
                message,
                created_at,
                user_profiles(
                    name
                )
            `)
                .order('created_at', { ascending: false })
                .limit(100);

            if (filters.log_type && filters.log_type !== 'all') {
                query = query.eq('log_type', filters.log_type);
            }

            if (filters.date_from) {
                query = query.gte('created_at', filters.date_from);
            }

            if (filters.date_to) {
                query = query.lte('created_at', filters.date_to);
            }

            if (filters.search) {
                query = query.or(`action.ilike.%${filters.search}%,message.ilike.%${filters.search}%`);
            }

            const { data, error } = await query;

            if (error) throw error;

            // @ts-ignore
            setLogs(data ? data.map(item => convertToCompact(item)) : []);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, [filters, isAuthorizedUser]); // Added isAuthorizedUser to dependencies

    const handleFiltersChange = (newFilters: LogFilters) => {
        setFilters(newFilters);
    };

    if (!isAuthorizedUser) {
        return (
            <RestrictedAccessMessage />
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
            <div className="max-w-7xl mx-auto">

                <div className="mb-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                            <div className="p-3 bg-blue-500 dark:bg-blue-600 rounded-xl shadow-lg">
                                <i className="fas fa-chart-line text-white text-2xl"></i>
                            </div>
                            <div>
                                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                                    Application Logs
                                </h1>
                                <p className="text-gray-600 dark:text-gray-400 mt-2 flex items-center">
                                    <i className="fas fa-eye mr-2 text-blue-500"></i>
                                    Monitor and analyze application activities in real-time
                                </p>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="flex items-center space-x-4 bg-white dark:bg-gray-800 rounded-lg px-4 py-3 shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Live</span>
                            </div>
                            <div className="h-4 w-px bg-gray-300 dark:bg-gray-600"></div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                {logs.length} log{logs.length !== 1 ? 's' : ''} loaded
                            </span>
                        </div>
                    </div>
                </div>

                {/* Error Alert */}
                {error && (
                    <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 shadow-lg transform transition-all duration-300 hover:scale-[1.02]">
                        <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 p-2 bg-red-100 dark:bg-red-800/30 rounded-lg">
                                <i className="fas fa-exclamation-triangle text-red-500 dark:text-red-400 text-lg"></i>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-sm font-semibold text-red-800 dark:text-red-300">Error Loading Logs</h3>
                                <div className="text-sm text-red-700 dark:text-red-400 mt-1">{error}</div>
                                <button
                                    onClick={fetchLogs}
                                    className="mt-2 inline-flex items-center px-3 py-1.5 text-xs font-medium bg-red-100 dark:bg-red-800/30 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-800/50 transition-colors"
                                >
                                    <i className="fas fa-redo mr-1.5"></i>
                                    Retry
                                </button>
                            </div>
                            <button
                                onClick={() => setError(null)}
                                className="flex-shrink-0 text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors"
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                )}

                {loading && logs.length === 0 && (
                    <div className="mb-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 animate-pulse">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
                                        <div className="ml-4 space-y-2">
                                            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
                                            <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-12"></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Stats Section */}
                {!loading && <LogsStats logs={logs} />}

                {/* Filters Section */}
                <div className="mb-6 transform transition-all duration-300">
                    <LogsFilters filters={filters} onFiltersChange={handleFiltersChange} />
                </div>

                <div className="mb-6 transform transition-all duration-300">
                    <LogsTrendChart logs={logs} />
                </div>

                {/* Table Section */}
                <div className="transform transition-all duration-300 hover:shadow-lg">
                    <LogsTable logs={logs} loading={loading} onRefresh={fetchLogs} />
                </div>

                {/* Footer Info */}
                <div className="mt-8 text-center">
                    <div className="inline-flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center space-x-2">
                            <i className="fas fa-database text-blue-500"></i>
                            <span>Supabase Backend</span>
                        </span>
                        <span className="flex items-center space-x-2">
                            <i className="fas fa-clock text-green-500"></i>
                            <span>Real-time Updates</span>
                        </span>
                        <span className="flex items-center space-x-2">
                            <i className="fas fa-shield-alt text-purple-500"></i>
                            <span>Secure Monitoring</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogsDashboard;