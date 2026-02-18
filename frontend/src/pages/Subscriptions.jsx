import React, { useState, useEffect } from 'react';
import { getSubscriptions, createSubscription, deleteSubscription, updateSubscription } from '../api/client';
import { Plus, Calendar, DollarSign, Trash2, Edit2, CheckCircle, AlertTriangle } from 'lucide-react';
import { format, addMonths, addYears, differenceInDays } from 'date-fns';

const Subscriptions = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newSub, setNewSub] = useState({
        serviceName: '',
        amount: '',
        currency: 'INR',
        billingCycle: 'Monthly',
        nextDueDate: '',
        category: 'Entertainment'
    });

    useEffect(() => {
        fetchSubscriptions();
    }, []);

    const fetchSubscriptions = async () => {
        try {
            const res = await getSubscriptions();
            setSubscriptions(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await createSubscription(newSub);
            setIsModalOpen(false);
            setNewSub({
                serviceName: '',
                amount: '',
                currency: 'INR',
                billingCycle: 'Monthly',
                nextDueDate: '',
                category: 'Entertainment'
            });
            fetchSubscriptions();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this subscription?')) {
            try {
                await deleteSubscription(id);
                fetchSubscriptions();
            } catch (err) {
                console.error(err);
            }
        }
    };

    const calculateTotalMonthly = () => {
        return subscriptions.reduce((acc, sub) => {
            if (sub.billingCycle === 'Monthly') return acc + sub.amount;
            return acc + (sub.amount / 12);
        }, 0);
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-white">Subscriptions</h1>
                    <p className="text-gray-400">Manage your recurring payments and bills.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-black font-bold px-4 py-2 rounded-lg transition-colors"
                >
                    <Plus size={18} /> Add Subscription
                </button>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#1a231e] p-6 rounded-2xl border border-[#2a3530]">
                    <div className="flex justify-between items-start mb-4">
                        <div className="bg-green-500/10 p-3 rounded-xl">
                            <Calendar className="text-green-500" size={24} />
                        </div>
                        <span className="bg-green-500/20 text-green-500 text-xs font-bold px-2 py-1 rounded-full">Active</span>
                    </div>
                    <p className="text-gray-400 text-sm mb-1">Total Monthly Cost</p>
                    <h3 className="text-3xl font-bold text-white">₹{calculateTotalMonthly().toFixed(2)}</h3>
                    <p className="text-gray-500 text-xs mt-2"> Across {subscriptions.length} services</p>
                </div>

                <div className="bg-[#1a231e] p-6 rounded-2xl border border-[#2a3530]">
                    <div className="flex justify-between items-start mb-4">
                        <div className="bg-blue-500/10 p-3 rounded-xl">
                            <DollarSign className="text-blue-500" size={24} />
                        </div>
                    </div>
                    <p className="text-gray-400 text-sm mb-1">Total Yearly Cost</p>
                    <h3 className="text-3xl font-bold text-white">₹{(calculateTotalMonthly() * 12).toFixed(2)}</h3>
                    <p className="text-gray-500 text-xs mt-2">Estimated projection</p>
                </div>

                <div className="bg-[#1a231e] p-6 rounded-2xl border border-[#2a3530]">
                    <div className="flex justify-between items-start mb-4">
                        <div className="bg-purple-500/10 p-3 rounded-xl">
                            <AlertTriangle className="text-purple-500" size={24} />
                        </div>
                        <span className="bg-purple-500/20 text-purple-500 text-xs font-bold px-2 py-1 rounded-full">Upcoming</span>
                    </div>
                    {subscriptions.length > 0 ? (
                        // Naive implementation - get earliest next due
                        <div>
                            <p className="text-gray-400 text-sm mb-1">Next Payment</p>
                            <h3 className="text-xl font-bold text-white">
                                {subscriptions.sort((a, b) => new Date(a.nextDueDate) - new Date(b.nextDueDate))[0].serviceName}
                            </h3>
                            <p className="text-gray-500 text-xs mt-2">
                                Due {format(new Date(subscriptions.sort((a, b) => new Date(a.nextDueDate) - new Date(b.nextDueDate))[0].nextDueDate), 'MMM dd')}
                            </p>
                        </div>
                    ) : (
                        <p className="text-gray-400">No active subscriptions</p>
                    )}
                </div>
            </div>

            {/* Subscriptions List */}
            <div className="bg-[#1a231e] rounded-2xl border border-[#2a3530] overflow-hidden">
                <div className="p-6 border-b border-[#2a3530]">
                    <h2 className="text-lg font-bold text-white">Active Subscriptions</h2>
                </div>
                <div className="divide-y divide-[#2a3530]">
                    {subscriptions.map(sub => {
                        const daysLeft = differenceInDays(new Date(sub.nextDueDate), new Date());
                        return (
                            <div key={sub._id} className="p-6 flex items-center justify-between hover:bg-[#202b25] transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-[#121815] rounded-xl flex items-center justify-center font-bold text-xl text-white">
                                        {sub.serviceName.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white text-lg">{sub.serviceName}</h3>
                                        <p className="text-sm text-gray-400">{sub.billingCycle} • {sub.category}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-8">
                                    <div className="text-right">
                                        <p className="text-xl font-bold text-white">₹{sub.amount}</p>
                                        <p className={`text-xs font-medium ${daysLeft <= 3 ? 'text-red-500' : 'text-green-500'}`}>
                                            Due in {daysLeft} days
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="p-2 text-gray-400 hover:text-white hover:bg-[#2a3530] rounded-lg transition-colors">
                                            <Edit2 size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(sub._id)}
                                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    {subscriptions.length === 0 && (
                        <div className="p-12 text-center text-gray-500">
                            No subscriptions found. Add one to get started!
                        </div>
                    )}
                </div>
            </div>

            {/* Add Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-[#1a231e] rounded-2xl p-8 border border-[#2a3530] w-full max-w-md">
                        <h2 className="text-xl font-bold text-white mb-6">Add Subscription</h2>
                        <form onSubmit={handleCreate} className="space-y-4">
                            <div>
                                <label className="block text-gray-400 text-sm mb-2">Service Name</label>
                                <input
                                    type="text"
                                    value={newSub.serviceName}
                                    onChange={e => setNewSub({ ...newSub, serviceName: e.target.value })}
                                    className="w-full bg-[#121815] border border-[#2a3530] text-white rounded-lg p-3 focus:outline-none focus:border-green-500"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-400 text-sm mb-2">Amount</label>
                                    <input
                                        type="number"
                                        value={newSub.amount}
                                        onChange={e => setNewSub({ ...newSub, amount: e.target.value })}
                                        className="w-full bg-[#121815] border border-[#2a3530] text-white rounded-lg p-3 focus:outline-none focus:border-green-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-sm mb-2">Cycle</label>
                                    <select
                                        value={newSub.billingCycle}
                                        onChange={e => setNewSub({ ...newSub, billingCycle: e.target.value })}
                                        className="w-full bg-[#121815] border border-[#2a3530] text-white rounded-lg p-3 focus:outline-none focus:border-green-500"
                                    >
                                        <option value="Monthly">Monthly</option>
                                        <option value="Yearly">Yearly</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-400 text-sm mb-2">Next Due Date</label>
                                <input
                                    type="date"
                                    value={newSub.nextDueDate}
                                    onChange={e => setNewSub({ ...newSub, nextDueDate: e.target.value })}
                                    className="w-full bg-[#121815] border border-[#2a3530] text-white rounded-lg p-3 focus:outline-none focus:border-green-500"
                                    required
                                />
                            </div>
                            <div className="flex gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 bg-transparent border border-[#2a3530] text-gray-300 font-bold py-3 rounded-lg hover:bg-[#2a3530] transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 bg-green-500 hover:bg-green-600 text-black font-bold py-3 rounded-lg transition-colors"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Subscriptions;
