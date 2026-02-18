import React, { useState, useRef } from 'react';
import { createExpense } from '../api/client';

const ExpenseForm = ({ onExpenseAdded }) => {
    const [amount, setAmount] = useState('0.00');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);

    // Mock categories for dropdown
    const categories = ['Food & Dining', 'Transport', 'Utilities', 'Shopping', 'Entertainment', 'Health', 'Travel'];

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleSubmit = async (e, addAnother = false) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const formData = new FormData();
        formData.append('amount', amount);
        formData.append('category', category);
        formData.append('description', description);
        formData.append('date', date);
        if (file) {
            formData.append('receipt', file);
        }

        try {
            await createExpense(formData);

            // Reset form
            setAmount('0.00');
            setCategory('');
            setDescription('');
            setDate('');
            setFile(null);
            if (fileInputRef.current) fileInputRef.current.value = '';

            if (onExpenseAdded) onExpenseAdded();

            if (!addAnother) {
                // Ideally this might close a modal, but here we just show success or clear
            }
        } catch (err) {
            setError('Failed to add expense. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#1a231e] rounded-xl shadow-2xl p-6 w-full max-w-lg mx-auto border border-[#2a3530] text-[#e0e0e0] font-sans">
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center space-x-2">
                    <div className="bg-green-500 rounded-full p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-bold text-white">Add New Expense</h2>
                </div>
                <button className="text-gray-400 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <form onSubmit={(e) => handleSubmit(e, false)}>
                {/* Amount Section */}
                <div className="mb-8 text-center border-b border-[#2a3530] pb-6">
                    <label className="block text-xs font-bold text-gray-500 tracking-wider uppercase mb-2">Total Amount</label>
                    <div className="flex items-center justify-center space-x-2">
                        <span className="text-4xl font-bold text-green-500">₹</span>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="bg-transparent text-6xl font-bold text-[#6b7280] focus:text-white text-center w-full focus:outline-none placeholder-gray-600"
                            placeholder="0.00"
                            step="0.01"
                            required
                        />
                    </div>
                </div>

                {/* Category & Date */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Category</label>
                        <div className="relative">
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="block w-full bg-[#121815] border border-[#2a3530] text-gray-300 py-3 px-4 pr-8 rounded-lg appearance-none focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 sm:text-sm"
                                required
                            >
                                <option value="" disabled>Select category...</option>
                                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Date</label>
                        <div className="relative">
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="block w-full bg-[#121815] border border-[#2a3530] text-gray-300 py-3 px-4 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 sm:text-sm"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                    <textarea
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="block w-full bg-[#121815] border border-[#2a3530] text-gray-300 py-3 px-4 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 sm:text-sm placeholder-gray-600"
                        placeholder="What was this expense for? (e.g. Dinner with clients)"
                        required
                    />
                </div>

                {/* File Upload */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-400 mb-1">Receipt / Attachment</label>
                    <div
                        className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-[#2a3530] border-dashed rounded-lg bg-[#121815] hover:bg-[#1a231e] transition-colors cursor-pointer"
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onClick={() => fileInputRef.current.click()}
                    >
                        <div className="space-y-1 text-center">
                            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <div className="flex text-sm text-gray-400 justify-center">
                                <span className="font-medium text-white hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500">
                                    Click to upload
                                </span>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">
                                {file ? file.name : "SVG, PNG, JPG or PDF (MAX. 5MB)"}
                            </p>
                            <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} accept=".jpg,.jpeg,.png,.pdf,.svg" />
                        </div>
                    </div>
                </div>

                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-[#2a3530]">
                    <button
                        type="button"
                        className="text-gray-400 hover:text-white font-medium text-sm px-4 py-2 rounded focus:outline-none"
                        onClick={() => {/* Handle cancel logic */ }}
                    >
                        Cancel
                    </button>
                    <div className="flex space-x-3">
                        <button
                            type="button"
                            onClick={(e) => handleSubmit(e, true)}
                            disabled={loading}
                            className="bg-[#2a3530] hover:bg-[#36423c] text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline text-sm transition-colors border border-transparent hover:border-gray-500"
                        >
                            Save & Add Another
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline text-sm transition-colors flex items-center ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {loading ? (
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : null}
                            Save Expense
                        </button>
                    </div>
                </div>
            </form>
            <div className="text-center mt-6 text-xs text-gray-500">
                Pro Tip: Use <span className="bg-[#2a3530] px-1 rounded text-gray-300">Cmd</span> + <span className="bg-[#2a3530] px-1 rounded text-gray-300">Enter</span> to save instantly.
            </div>
        </div>
    );
};

export default ExpenseForm;
