// components/charts/LogsTrendChart.tsx
import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale,
    Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import {CompactLogs} from "./LogsDashboard.tsx";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale,
    Filler
);

interface LogsTrendChartProps {
    logs: CompactLogs[];
    date_from?: string;
    date_to?: string;
}

const LogsTrendChart: React.FC<LogsTrendChartProps> = ({ logs, date_from, date_to }) => {
    const getTimeLabels = () => {
        if (!date_from || !date_to) {
            // Default to last 24 hours if no dates provided
            const labels = [];
            const now = new Date();
            for (let i = 23; i >= 0; i--) {
                const time = new Date(now);
                time.setHours(now.getHours() - i);
                labels.push(time.toLocaleTimeString('en-US', { hour: '2-digit', hour12: false }));
            }
            return labels;
        }

        const start = new Date(date_from);
        const end = new Date(date_to);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        const labels = [];

        if (diffDays <= 1) {
            // Hourly breakdown for single day
            for (let i = 0; i <= 23; i++) {
                const time = new Date(start);
                time.setHours(i);
                labels.push(time.toLocaleTimeString('en-US', { hour: '2-digit', hour12: false }));
            }
        } else if (diffDays <= 7) {
            // Daily breakdown for up to 7 days
            for (let i = 0; i <= diffDays; i++) {
                const date = new Date(start);
                date.setDate(start.getDate() + i);
                labels.push(date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }));
            }
        } else if (diffDays <= 30) {
            // Weekly breakdown for up to 30 days
            const weeks = Math.ceil(diffDays / 7);
            for (let i = 0; i < weeks; i++) {
                const date = new Date(start);
                date.setDate(start.getDate() + (i * 7));
                labels.push(`Week ${i + 1} (${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})`);
            }
        } else {
            // Monthly breakdown for longer periods
            const months = Math.ceil(diffDays / 30);
            for (let i = 0; i < months; i++) {
                const date = new Date(start);
                date.setMonth(start.getMonth() + i);
                labels.push(date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }));
            }
        }

        return labels;
    };

    const getChartData = () => {
        const labels = getTimeLabels();
        const data = new Array(labels.length).fill(0);

        if (!date_from || !date_to) {
            // Default to last 24 hours
            logs.forEach(log => {
                const logDate = new Date(log.createdAt);
                const hour = logDate.getHours();
                const index = labels.findIndex(label => parseInt(label) === hour);
                if (index !== -1) {
                    data[index]++;
                }
            });
            return data;
        }

        const start = new Date(date_from);
        const end = new Date(date_to);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        logs.forEach(log => {
            const logDate = new Date(log.createdAt);

            if (logDate < start || logDate > end) return;

            let index = -1;

            if (diffDays <= 1) {
                // Hourly
                const hour = logDate.getHours();
                index = hour;
            } else if (diffDays <= 7) {
                // Daily
                const dayDiff = Math.floor((logDate.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
                index = dayDiff;
            } else if (diffDays <= 30) {
                // Weekly
                const weekDiff = Math.floor((logDate.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 7));
                index = weekDiff;
            } else {
                // Monthly
                const monthDiff = (logDate.getFullYear() - start.getFullYear()) * 12 + (logDate.getMonth() - start.getMonth());
                index = monthDiff;
            }

            if (index >= 0 && index < data.length) {
                data[index]++;
            }
        });

        return data;
    };

    const getTimeframeText = () => {
        if (!date_from || !date_to) {
            return 'Last 24 Hours';
        }

        const start = new Date(date_from);
        const end = new Date(date_to);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays <= 1) {
            return start.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        } else if (diffDays <= 7) {
            return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
        } else {
            return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
        }
    };

    const data = {
        labels: getTimeLabels(),
        datasets: [
            {
                label: 'Log Count',
                data: getChartData(),
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: 'rgb(59, 130, 246)',
                pointBorderColor: 'white',
                pointBorderWidth: 2,
                pointRadius: 3,
                pointHoverRadius: 5,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: 'white',
                bodyColor: 'white',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                borderWidth: 1,
                cornerRadius: 6,
                displayColors: false,
                callbacks: {
                    label: function(context: any) {
                        return `${context.parsed.y} logs`;
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: 'rgb(156, 163, 175)',
                    font: {
                        size: 11,
                    },
                    maxRotation: 45,
                },
                border: {
                    display: false,
                },
            },
            y: {
                grid: {
                    color: 'rgba(156, 163, 175, 0.2)',
                },
                ticks: {
                    color: 'rgb(156, 163, 175)',
                    font: {
                        size: 11,
                    },
                    precision: 0,
                },
                border: {
                    display: false,
                },
                beginAtZero: true,
            },
        },
        interaction: {
            intersect: false,
            mode: 'index' as const,
        },
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Log Trends</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{getTimeframeText()}</p>
                </div>
            </div>
            <div className="h-[200px]">
                <Line data={data} options={options} />
            </div>
        </div>
    );
};

export default LogsTrendChart;