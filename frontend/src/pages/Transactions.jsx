import React, { useEffect, useState } from 'react';
import { getExpenses } from '../api/client';
import { Search, Filter, Download } from 'lucide-react';

const Transactions = () => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [dateRange, setDateRange] = useState('30_days');

    useEffect(() => {
        fetchTransactions();
    }, [category, dateRange]);

    const fetchTransactions = async () => {
        setLoading(true);
        try {
            const params = {};
            if (category) params.category = category;
            // Date range logic would go here in a real app
            const res = await getExpenses(params);
            setExpenses(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const filteredExpenses = expenses.filter(expense =>
        expense.description.toLowerCase().includes(search.toLowerCase()) ||
        expense.category.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">All Transactions</h1>
                    <p className="text-gray-400">View, filter, and manage your complete financial history.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 bg-[#1a231e] hover:bg-[#2a3530] text-gray-300 border border-[#2a3530] px-4 py-2 rounded-lg transition-colors">
                        <Download size={18} />
                        Export
                    </button>
                    <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-black font-bold px-4 py-2 rounded-lg transition-colors">
                        <span className="text-lg">+</span> Add Expense
                    </button>
                </div>
            </div>

            {/* Filters Bar */}
            <div className="bg-[#1a231e] p-4 rounded-xl border border-[#2a3530] flex flex-wrap gap-4 items-center">
                <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                    <input
                        type="text"
                        placeholder="Search by description..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-[#121815] border border-[#2a3530] text-gray-300 pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:border-green-500"
                    />
                </div>

                <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="bg-[#121815] border border-[#2a3530] text-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:border-green-500"
                >
                    <option value="30_days">Last 30 Days</option>
                    <option value="90_days">Last 3 Months</option>
                    <option value="year">This Year</option>
                </select>

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="bg-[#121815] border border-[#2a3530] text-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:border-green-500"
                >
                    <option value="">All Categories</option>
                    <option value="Food & Dining">Food & Dining</option>
                    <option value="Transport">Transport</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Shopping">Shopping</option>
                </select>

                <button className="text-gray-400 hover:text-white text-sm font-medium ml-auto">
                    Reset Filters
                </button>
            </div>

            {/* Transactions Table */}
            <div className="bg-[#1a231e] rounded-xl border border-[#2a3530] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-[#2a3530] text-gray-400 text-xs uppercase tracking-wider">
                                <th className="p-4 w-12 text-center">
                                    <input type="checkbox" className="rounded bg-[#121815] border-[#2a3530]" />
                                </th>
                                <th className="p-4 font-medium">Date</th>
                                <th className="p-4 font-medium">Description</th>
                                <th className="p-4 font-medium">Category</th>
                                <th className="p-4 font-medium text-right">Amount</th>
                                <th className="p-4 font-medium text-center">Receipt</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#2a3530]">
                            {loading ? (
                                <tr>
                                    <td colSpan="6" className="p-8 text-center text-gray-500">Loading transactions...</td>
                                </tr>
                            ) : filteredExpenses.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="p-8 text-center text-gray-500">No transactions found.</td>
                                </tr>
                            ) : (
                                filteredExpenses.map((expense) => (
                                    <tr key={expense._id} className="hover:bg-[#2a3530]/30 transition-colors group">
                                        <td className="p-4 text-center">
                                            <input type="checkbox" className="rounded bg-[#121815] border-[#2a3530]" />
                                        </td>
                                        <td className="p-4 text-gray-300 whitespace-nowrap">
                                            {new Date(expense.date).toLocaleDateString()}
                                        </td>
                                        <td className="p-4">
                                            <p className="font-medium text-white">{expense.description}</p>
                                            {/* <p className="text-xs text-gray-500">Subtext if available</p> */}
                                        </td>
                                        <td className="p-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#121815] text-green-400 border border-[#2a3530]">
                                                {expense.category}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right font-bold text-white">
                                            - ₹{expense.amount.toFixed(2)}
                                        </td>
                                        <td className="p-4 text-center">
                                            {expense.receipt ? (
                                                <a href={`http://localhost:3001/${expense.receipt}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                                                    <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                                </a>
                                            ) : (
                                                <span className="text-gray-600">-</span>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="p-4 border-t border-[#2a3530] flex justify-between items-center text-sm text-gray-400">
                    <span>Showing <strong>{filteredExpenses.length}</strong> transactions</span>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 bg-[#121815] border border-[#2a3530] rounded hover:bg-[#2a3530] disabled:opacity-50" disabled>Previous</button>
                        <button className="px-3 py-1 bg-[#121815] border border-[#2a3530] rounded hover:bg-[#2a3530] disabled:opacity-50" disabled>Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Transactions;
