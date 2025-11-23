import React, { useState, useEffect } from 'react';
import {LogEntry, LogFilters} from '../types/logs';
import LogsTable from './LogsTable';
import LogsStats from './LogsStats';
import {supabase} from "../services/supabase.ts";
import LogsFilters from "./LogFilters.tsx";
import LogsTrendChart from "./LogsTrendChart.tsx";
import { useAuth } from '../contexts/AuthContext';
import RestrictedAccessMessage from "./RestrictedAccessMessage.tsx";

export interface CompactLogs {
    id: LogEntry['id'];
    action: LogEntry['action'];
    logType: LogEntry['log_type'];
    message: LogEntry['message'];
    username?: string;
    createdAt: string;
    sessionId: string;
    additionalData?: Record<string, any>;
    ipAddress?: string;
    userAgent?: string;
}

interface LogsDto {
    id: LogEntry['id'];
    action: LogEntry['action'];
    log_type: LogEntry['log_type'];
    message: LogEntry['message'];
    created_at: string;
    user_profiles: {
        name: string;
    },
    session_id: string;
    additional_data?: Record<string, any>;
    ip_address?: string;
    user_agent?: string;
}

interface PaginationState {
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
}

function convertToCompact(dto: LogsDto) : CompactLogs {
    return {
        id: dto.id,
        action: dto.action,
        logType: dto.log_type,
        message: dto.message,
        username: dto.user_profiles?.name,
        createdAt: dto.created_at,
        sessionId: dto.session_id,
        additionalData: dto.additional_data,
        ipAddress: dto.ip_address,
        userAgent: dto.user_agent
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
    const [pagination, setPagination] = useState<PaginationState>({
        page: 1,
        pageSize: 25,
        totalCount: 0,
        totalPages: 0,
    });

    const isAuthorizedUser = user?.id === '9c9deca4-1ec0-45b6-99e9-e4bd59814d0d';

    const fetchLogs = async (page: number = pagination.page) => {
        // Don't fetch logs if user is not authorized
        if (!isAuthorizedUser) {
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);

            // First, get the total count for pagination
            let countQuery = supabase
                .from('logs')
                .select('*', { count: 'exact', head: true });

            let query = supabase
                .from('logs')
                .select(`
                *,
                user_profiles(
                    name
                )
            `)
            .order('created_at', { ascending: false })
            .range((page - 1) * pagination.pageSize, page * pagination.pageSize - 1);

            if (filters.log_type && filters.log_type !== 'all') {
                query = query.eq('log_type', filters.log_type);
                countQuery = countQuery.eq('log_type', filters.log_type);
            }

            if (filters.date_from) {
                query = query.gte('created_at', filters.date_from);
                countQuery = countQuery.gte('created_at', filters.date_from);
            }

            if (filters.date_to) {
                query = query.lte('created_at', filters.date_to);
                countQuery = countQuery.lte('created_at', filters.date_to);
            }

            if (filters.search) {
                query = query.or(`action.ilike.%${filters.search}%,message.ilike.%${filters.search}%`);
                countQuery = countQuery.or(`action.ilike.%${filters.search}%,message.ilike.%${filters.search}%`);
            }

            // Execute count query
            const { count, error: countError } = await countQuery;
            if (countError) throw countError;

            // Execute data query
            const { data, error } = await query;

            if (error) throw error;

            // @ts-ignore
            setLogs(data ? data.map(item => convertToCompact(item)) : []);

            // Update pagination state
            const totalCount = count || 0;
            const totalPages = Math.ceil(totalCount / pagination.pageSize);
            setPagination(prev => ({
                ...prev,
                page,
                totalCount,
                totalPages,
            }));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Reset to page 1 when filters change
        setPagination(prev => ({ ...prev, page: 1 }));
        fetchLogs(1);
    }, [filters, isAuthorizedUser]); // Added isAuthorizedUser to dependencies

    const handleFiltersChange = (newFilters: LogFilters) => {
        setFilters(newFilters);
    };

    const handlePageChange = (newPage: number) => {
        fetchLogs(newPage);
    };

    const handlePageSizeChange = (newPageSize: number) => {
        setPagination(prev => ({
            ...prev,
            pageSize: newPageSize,
            page: 1, // Reset to first page when changing page size
        }));
        // The useEffect will trigger due to pagination state change
    };

    // Effect to refetch when pageSize changes
    useEffect(() => {
        if (pagination.page === 1) {
            fetchLogs(1);
        } else {
            // If not on page 1, reset to page 1 to trigger refetch
            setPagination(prev => ({ ...prev, page: 1 }));
        }
    }, [pagination.pageSize]);

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
                                Showing {logs.length} of {pagination.totalCount} logs
                            </span>
                            <div className="h-4 w-px bg-gray-300 dark:bg-gray-600"></div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                Page {pagination.page} of {pagination.totalPages || 1}
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
                                    onClick={() => fetchLogs()}
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

                {/* Pagination Controls */}
                <div className="mb-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Show</span>
                            <select
                                value={pagination.pageSize}
                                onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                                className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                                <option value={200}>200</option>
                            </select>
                            <span className="text-sm text-gray-600 dark:text-gray-400">entries</span>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => handlePageChange(pagination.page - 1)}
                            disabled={pagination.page <= 1}
                            className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <i className="fas fa-chevron-left mr-2"></i>
                            Previous
                        </button>

                        <div className="flex items-center space-x-1">
                            {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                                let pageNum;
                                if (pagination.totalPages <= 5) {
                                    pageNum = i + 1;
                                } else if (pagination.page <= 3) {
                                    pageNum = i + 1;
                                } else if (pagination.page >= pagination.totalPages - 2) {
                                    pageNum = pagination.totalPages - 4 + i;
                                } else {
                                    pageNum = pagination.page - 2 + i;
                                }

                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => handlePageChange(pageNum)}
                                        className={`w-10 h-10 text-sm font-medium rounded-lg transition-colors ${
                                            pagination.page === pageNum
                                                ? 'bg-blue-500 text-white border border-blue-500'
                                                : 'text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                                        }`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}
                        </div>

                        <button
                            onClick={() => handlePageChange(pagination.page + 1)}
                            disabled={pagination.page >= pagination.totalPages}
                            className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Next
                            <i className="fas fa-chevron-right ml-2"></i>
                        </button>
                    </div>
                </div>

                <div className="mb-6 transform transition-all duration-300">
                    <LogsTrendChart logs={logs} />
                </div>

                {/* Table Section */}
                <div className="transform transition-all duration-300 hover:shadow-lg">
                    <LogsTable
                        logs={logs}
                        loading={loading}
                        onRefresh={() => fetchLogs()}
                    />
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