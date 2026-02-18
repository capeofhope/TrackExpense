import React, { useEffect, useState } from 'react';
import { getExpenses, API_BASE_URL } from '../api/client';

const ExpenseList = ({ refreshTrigger }) => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categoryFilter, setCategoryFilter] = useState('');
    const [sortOrder, setSortOrder] = useState('date_desc');

    const fetchExpenses = async () => {
        setLoading(true);
        setError(null);
        try {
            const params = {};
            if (categoryFilter) params.category = categoryFilter;
            if (sortOrder) params.sort = sortOrder;

            const response = await getExpenses(params);
            setExpenses(response.data);
        } catch (err) {
            setError('Failed to load expenses.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, [refreshTrigger, categoryFilter, sortOrder]);

    const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    return (
        <div className="bg-[#1a231e] rounded-xl shadow-2xl p-6 border border-[#2a3530] text-[#e0e0e0] font-sans h-full">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Recent Expenses</h2>
                <div className="bg-[#121815] px-3 py-1 rounded-full border border-[#2a3530] text-sm text-gray-400">
                    {expenses.length} entries
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </span>
                    <input
                        type="text"
                        placeholder="Filter by Category..."
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="w-full bg-[#121815] border border-[#2a3530] text-gray-300 py-2 pl-10 pr-4 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 placeholder-gray-600 sm:text-sm"
                    />
                </div>
                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="bg-[#121815] border border-[#2a3530] text-gray-300 py-2 px-4 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 sm:text-sm"
                >
                    <option value="date_desc">Newest First</option>
                    <option value="date_asc">Oldest First</option>
                </select>
            </div>

            <div className="mb-6 bg-gradient-to-r from-[#121815] to-[#1a231e] p-4 rounded-lg border border-[#2a3530] flex justify-between items-center shadow-inner">
                <span className="text-gray-400 font-medium text-sm uppercase tracking-wider">Total Spent</span>
                <span className="text-2xl font-bold text-green-500">₹{totalAmount.toFixed(2)}</span>
            </div>

            {loading ? (
                <div className="flex justify-center py-12">
                    <svg className="animate-spin h-8 w-8 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>
            ) : error ? (
                <div className="text-red-400 text-center py-8 bg-red-900/10 rounded-lg border border-red-900/20 text-sm">{error}</div>
            ) : expenses.length === 0 ? (
                <div className="text-center py-16 text-gray-500 bg-[#121815] rounded-lg border border-[#2a3530] border-dashed">
                    <svg className="mx-auto h-12 w-12 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                    <p className="mt-2">No expenses found.</p>
                </div>
            ) : (
                <div className="overflow-hidden rounded-lg border border-[#2a3530]">
                    <ul className="divide-y divide-[#2a3530]">
                        {expenses.map((expense) => (
                            <li key={expense._id} className="bg-[#1a231e] hover:bg-[#202b25] transition-colors p-4 group">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1 min-w-0 mr-4">
                                        <div className="flex items-center justify-between mb-1">
                                            <p className="font-semibold text-white truncate group-hover:text-green-400 transition-colors">{expense.description}</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-[#2a3530] text-gray-300 border border-[#36423c]">
                                                {expense.category}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                {new Date(expense.date).toLocaleDateString()}
                                            </span>
                                            {expense.receipt && (
                                                <a
                                                    href={`${API_BASE_URL}/${expense.receipt}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center text-xs text-green-500 hover:text-green-400 gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    title="View Receipt"
                                                >
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                                                    Receipt
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-right whitespace-nowrap">
                                        <p className="font-bold text-white text-lg tracking-tight">₹{expense.amount.toFixed(2)}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ExpenseList;
