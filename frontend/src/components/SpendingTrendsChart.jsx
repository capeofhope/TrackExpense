import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

const SpendingTrendsChart = ({ expenses = [], days = 7, income = 0 }) => {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: '#1a231e',
                titleColor: '#fff',
                bodyColor: '#9ca3af',
                borderColor: '#2a3530',
                borderWidth: 1,
                padding: 10,
                displayColors: false,
            }
        },
        scales: {
            y: {
                grid: {
                    color: '#2a3530',
                    drawBorder: false,
                },
                ticks: {
                    color: '#6b7280',
                    font: {
                        size: 11
                    }
                },
                border: {
                    display: false
                }
            },
            x: {
                grid: {
                    display: false,
                    drawBorder: false,
                },
                ticks: {
                    color: '#6b7280',
                    font: {
                        size: 11
                    }
                },
                border: {
                    display: false
                }
            },
        },
        interaction: {
            intersect: false,
            mode: 'index',
        },
    };

    // Process expenses to get daily spending for the last N days
    const processData = () => {
        const lastNDays = [...Array(days)].map((_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - ((days - 1) - i));
            return d;
        });

        const labels = lastNDays.map(d => d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' }));

        const expenseData = lastNDays.map(date => {
            const dayStr = date.toDateString();
            return expenses
                .filter(e => new Date(e.date).toDateString() === dayStr)
                .reduce((sum, e) => sum + e.amount, 0);
        });

        // Calculate daily income average (Total / 30) for comparison line
        // Or if income is 0, just don't show it or show 0
        const dailyIncome = income > 0 ? (income / 30) : 0;
        const incomeData = lastNDays.map(() => dailyIncome);

        return { labels, expenseData, incomeData };
    };

    const { labels, expenseData, incomeData } = processData();

    const data = {
        labels,
        datasets: [
            {
                fill: true,
                label: 'Expenses',
                data: expenseData,
                borderColor: '#22c55e',
                backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                    gradient.addColorStop(0, 'rgba(34, 197, 94, 0.2)');
                    gradient.addColorStop(1, 'rgba(34, 197, 94, 0)');
                    return gradient;
                },
                borderWidth: 2,
                tension: 0.4,
                pointRadius: days > 14 ? 0 : 3, // Hide points for long ranges for cleaner look
                pointHoverRadius: 6,
            },
            {
                fill: false,
                label: 'Daily Budget (Est. Income)',
                data: incomeData,
                borderColor: '#3b82f6', // Blue line for Income/Limit
                borderWidth: 2,
                borderDash: [5, 5],
                pointRadius: 0,
                tension: 0,
            }
        ],
    };

    return <Line options={options} data={data} />;
};

export default SpendingTrendsChart;
