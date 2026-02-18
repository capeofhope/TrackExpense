import React, { useState, useEffect } from 'react';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import StatCard from '../components/StatCard';
import SpendingTrendsChart from '../components/SpendingTrendsChart';
import BudgetStatus from '../components/BudgetStatus';
import { getExpenses, getBudgets } from '../api/client';
import { DollarSign, CreditCard, TrendingUp, Wallet } from 'lucide-react';

const Dashboard = () => {
    const [expenses, setExpenses] = useState([]);
    const [budgets, setBudgets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const fetchData = async () => {
        try {
            const [expensesRes, budgetsRes] = await Promise.all([
                getExpenses(),
                getBudgets()
            ]);
            setExpenses(expensesRes.data);
            setBudgets(budgetsRes.data);
        } catch (error) {
            console.error("Failed to fetch dashboard data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [refreshTrigger]);

    const handleExpenseAdded = () => {
        setRefreshTrigger(prev => prev + 1);
    };

    // Analytics Calculation
    const totalSpending = expenses.reduce((sum, e) => sum + e.amount, 0);

    // Calculate monthly spending (simple filter for current month)
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const monthlySpending = expenses
        .filter(e => {
            const d = new Date(e.date);
            return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
        })
        .reduce((sum, e) => sum + e.amount, 0);

    // Mock Income (since we don't track income explicitly yet, or we can assume a fixed budget is income)
    // For now, let's treat "Total Budget" as "Income" or just hardcode a placeholder if no income feature exists
    const totalBudget = budgets.reduce((sum, b) => sum + b.limit, 0);
    const balance = 50000 - totalSpending; // Mock starting balance of 50k for demo purposes

    return (
        <div className="space-y-6">
            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Balance"
                    amount={`₹${balance.toFixed(2)}`}
                    percentage="--"
                    trend="up"
                    icon={Wallet}
                    color="bg-green-500"
                />
                <StatCard
                    title="Monthly Spending"
                    amount={`₹${monthlySpending.toFixed(2)}`}
                    percentage="--"
                    trend="down"
                    icon={CreditCard}
                    color="bg-blue-500"
                />
                <StatCard
                    title="Total Budget"
                    amount={`₹${totalBudget.toFixed(2)}`}
                    percentage="--"
                    trend="up"
                    icon={DollarSign}
                    color="bg-yellow-500"
                />
                <StatCard
                    title="Total Expenses"
                    amount={`₹${totalSpending.toFixed(2)}`}
                    percentage="100%"
                    trend="down"
                    icon={TrendingUp}
                    color="bg-purple-500"
                />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-[#1a231e] rounded-2xl p-6 border border-[#2a3530]">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-white">Spending Trends (Last 7 Days)</h3>
                    </div>
                    <div className="h-64">
                        <SpendingTrendsChart expenses={expenses} />
                    </div>
                </div>
                <div className="lg:col-span-1">
                    <BudgetStatus budgets={budgets} expenses={expenses} />
                </div>
            </div>

            {/* Bottom Split */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    {/* Reusing existing ExpenseList but configured for Dashboard view */}
                    <ExpenseList refreshTrigger={refreshTrigger} />
                </div>
                <div className="lg:col-span-1">
                    <ExpenseForm onExpenseAdded={handleExpenseAdded} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
