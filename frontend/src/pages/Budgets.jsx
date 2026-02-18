import React, { useState, useEffect } from 'react';
import { getBudgets, getExpenses, createBudget, deleteBudget } from '../api/client';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

const Budgets = () => {
    const [budgets, setBudgets] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // New Budget State
    const [newBudget, setNewBudget] = useState({
        category: '',
        limit: '',
        color: 'bg-green-500'
    });

    const categories = ['Food & Dining', 'Transport', 'Utilities', 'Shopping', 'Entertainment', 'Health', 'Create Custom'];
    const colors = ['bg-green-500', 'bg-blue-500', 'bg-red-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500', 'bg-orange-500'];

    const fetchData = async () => {
        try {
            const [bRes, eRes] = await Promise.all([getBudgets(), getExpenses()]);
            setBudgets(bRes.data);
            setExpenses(eRes.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const processBudgets = () => {
        return budgets.map(budget => {
            const spent = expenses
                .filter(e => e.category === budget.category)
                .reduce((sum, e) => sum + e.amount, 0);
            return { ...budget, spent };
        });
    };

    const processedBudgets = processBudgets();

    const totalBudget = processedBudgets.reduce((acc, curr) => acc + curr.limit, 0);
    const totalSpent = processedBudgets.reduce((acc, curr) => acc + curr.spent, 0);

    const handleCreateBudget = async (e) => {
        e.preventDefault();
        try {
            await createBudget(newBudget);
            setIsModalOpen(false);
            setNewBudget({ category: '', limit: '', color: 'bg-green-500' });
            fetchData();
        } catch (err) {
            alert('Failed to create budget');
        }
    };

    const handleDeleteBudget = async (id) => {
        if (window.confirm('Are you sure you want to delete this budget?')) {
            try {
                await deleteBudget(id);
                fetchData();
            } catch (err) {
                alert('Failed to delete budget');
            }
        }
    };

    return (
        <div className="space-y-8 relative">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-white">Budget Planning</h1>
                    <p className="text-gray-400">Manage your monthly spending limits.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-black font-bold px-4 py-2 rounded-lg transition-colors"
                >
                    <Plus size={18} /> New Category
                </button>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Similar to before but using calculated values */}
                <div className="bg-[#1a231e] p-6 rounded-2xl border border-[#2a3530]">
                    <p className="text-gray-400 text-sm mb-1">Total Budget</p>
                    <h3 className="text-2xl font-bold text-white">₹{totalBudget.toFixed(2)}</h3>
                </div>
                <div className="bg-[#1a231e] p-6 rounded-2xl border border-[#2a3530]">
                    <p className="text-gray-400 text-sm mb-1">Total Spent</p>
                    <h3 className="text-2xl font-bold text-white">₹{totalSpent.toFixed(2)}</h3>
                    <div className="mt-4 text-xs text-yellow-500 bg-yellow-900/20 inline-block px-2 py-1 rounded">
                        {totalBudget > 0 ? ((totalSpent / totalBudget) * 100).toFixed(1) : 0}% used
                    </div>
                </div>
                <div className="bg-[#1a231e] p-6 rounded-2xl border border-[#2a3530]">
                    <p className="text-gray-400 text-sm mb-1">Remaining</p>
                    <h3 className="text-2xl font-bold text-white">₹{(totalBudget - totalSpent).toFixed(2)}</h3>
                    <div className="w-full bg-[#121815] rounded-full h-1.5 mt-4">
                        <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${totalBudget > 0 ? ((totalBudget - totalSpent) / totalBudget) * 100 : 0}%` }}></div>
                    </div>
                </div>
            </div>

            {/* Budget Grid */}
            <h2 className="text-xl font-bold text-white">Category Breakdown</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {processedBudgets.map(budget => {
                    const percentage = Math.min((budget.spent / budget.limit) * 100, 100);
                    const isExceeded = budget.spent > budget.limit;

                    return (
                        <div key={budget._id} className="bg-[#1a231e] rounded-2xl p-6 border border-[#2a3530] hover:border-green-500/30 transition-colors relative group">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-xl ${budget.color} bg-opacity-20 flex items-center justify-center`}>
                                        <div className={`w-4 h-4 rounded-full ${budget.color}`}></div>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white">{budget.category}</h3>
                                        <p className="text-xs text-gray-400">Monthly Variable</p>
                                    </div>
                                </div>
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                                    <button onClick={() => handleDeleteBudget(budget._id)} className="text-gray-400 hover:text-red-500"><Trash2 size={16} /></button>
                                </div>
                            </div>

                            <div className="mb-2">
                                <span className={`text-2xl font-bold ${isExceeded ? 'text-red-500' : 'text-white'}`}>
                                    ₹{budget.spent}
                                </span>
                                <span className="text-gray-500 text-sm"> / ₹{budget.limit} limit</span>
                            </div>

                            <div className="w-full bg-[#121815] rounded-full h-2 mb-2">
                                <div
                                    className={`h-2 rounded-full ${isExceeded ? 'bg-red-500' : 'bg-green-500'}`}
                                    style={{ width: `${percentage}%` }}
                                ></div>
                            </div>

                            <div className="flex justify-between text-xs">
                                <span className="text-gray-400">Spent: ₹{budget.spent}</span>
                                <span className={`${isExceeded ? 'text-red-500' : 'text-green-500'} font-medium`}>
                                    {Math.round(percentage)}%
                                </span>
                            </div>
                        </div>
                    );
                })}

                {/* Add New Budget Card */}
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="border-2 border-dashed border-[#2a3530] rounded-2xl p-6 flex flex-col items-center justify-center text-gray-500 hover:text-green-500 hover:border-green-500/50 transition-all group h-full min-h-[200px]"
                >
                    <div className="w-12 h-12 rounded-full bg-[#1a231e] flex items-center justify-center mb-3 group-hover:bg-green-500/10 transition-colors">
                        <Plus size={24} />
                    </div>
                    <span className="font-medium">Add New Budget Category</span>
                </button>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-[#1a231e] rounded-2xl p-8 border border-[#2a3530] w-full max-w-md relative">
                        <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                            <X size={24} />
                        </button>
                        <h2 className="text-xl font-bold text-white mb-6">Create New Budget</h2>

                        <form onSubmit={handleCreateBudget} className="space-y-4">
                            <div>
                                <label className="block text-gray-400 text-sm mb-2">Category</label>
                                <select
                                    value={newBudget.category}
                                    onChange={(e) => setNewBudget({ ...newBudget, category: e.target.value })}
                                    className="w-full bg-[#121815] border border-[#2a3530] text-white rounded-lg p-3 focus:outline-none focus:border-green-500"
                                    required
                                >
                                    <option value="">Select Category</option>
                                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-400 text-sm mb-2">Monthly Limit (₹)</label>
                                <input
                                    type="number"
                                    value={newBudget.limit}
                                    onChange={(e) => setNewBudget({ ...newBudget, limit: e.target.value })}
                                    className="w-full bg-[#121815] border border-[#2a3530] text-white rounded-lg p-3 focus:outline-none focus:border-green-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-400 text-sm mb-2">Color Tag</label>
                                <div className="flex gap-2">
                                    {colors.map(color => (
                                        <button
                                            key={color}
                                            type="button"
                                            onClick={() => setNewBudget({ ...newBudget, color })}
                                            className={`w-8 h-8 rounded-full ${color} ${newBudget.color === color ? 'ring-2 ring-white ring-offset-2 ring-offset-[#1a231e]' : ''}`}
                                        />
                                    ))}
                                </div>
                            </div>

                            <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-3 rounded-lg mt-4 transition-colors">
                                Create Budget
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Budgets;
