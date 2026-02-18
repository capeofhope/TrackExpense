import React, { useState } from 'react';
import { Plus, Trash2, Edit2, X, Check } from 'lucide-react';
import { addCategory, deleteCategory, updateCategory } from '../../api/client';

const CategoriesSection = ({ user, onUpdate }) => { // onUpdate to refresh user data
    const [isAdding, setIsAdding] = useState(false);
    const [newCategory, setNewCategory] = useState({
        name: '',
        type: 'Expense',
        color: 'bg-gray-500',
        icon: 'Circle'
    });
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({});

    const colors = [
        'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500',
        'bg-teal-500', 'bg-blue-500', 'bg-indigo-500', 'bg-purple-500',
        'bg-pink-500', 'bg-gray-500'
    ];

    const icons = ['Circle', 'Utensils', 'Car', 'Zap', 'ShoppingBag', 'Film', 'DollarSign', 'Briefcase', 'Home', 'Gift', 'Book', 'Coffee'];

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            const res = await addCategory(newCategory);
            onUpdate(res.data); // Update parent state with new categories
            setIsAdding(false);
            setNewCategory({ name: '', type: 'Expense', color: 'bg-gray-500', icon: 'Circle' });
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this category?')) {
            try {
                const res = await deleteCategory(id);
                onUpdate(res.data);
            } catch (err) {
                console.error(err);
            }
        }
    };

    const startEdit = (cat) => {
        setEditingId(cat._id);
        setEditForm(cat);
    };

    const handleUpdate = async () => {
        try {
            const res = await updateCategory(editingId, editForm);
            onUpdate(res.data);
            setEditingId(null);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="bg-[#1a231e] rounded-xl shadow-lg p-8 border border-[#2a3530]">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-white">Categories</h2>
                    <p className="text-gray-400 text-sm">Customize your expense and income categories.</p>
                </div>
                <button
                    onClick={() => setIsAdding(true)}
                    className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-black font-bold px-4 py-2 rounded-lg transition-colors"
                >
                    <Plus size={18} /> Add Category
                </button>
            </div>

            {/* Add Category Form */}
            {isAdding && (
                <div className="mb-8 bg-[#121815] p-6 rounded-xl border border-[#2a3530]">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-white">New Category</h3>
                        <button onClick={() => setIsAdding(false)}><X size={18} className="text-gray-400 hover:text-white" /></button>
                    </div>
                    <form onSubmit={handleAdd} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Category Name"
                                value={newCategory.name}
                                onChange={e => setNewCategory({ ...newCategory, name: e.target.value })}
                                className="bg-[#1a231e] border border-[#2a3530] text-white rounded-lg p-3 focus:outline-none focus:border-green-500"
                                required
                            />
                            <select
                                value={newCategory.type}
                                onChange={e => setNewCategory({ ...newCategory, type: e.target.value })}
                                className="bg-[#1a231e] border border-[#2a3530] text-white rounded-lg p-3 focus:outline-none focus:border-green-500"
                            >
                                <option value="Expense">Expense</option>
                                <option value="Income">Income</option>
                            </select>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {colors.map(color => (
                                <button
                                    key={color}
                                    type="button"
                                    onClick={() => setNewCategory({ ...newCategory, color })}
                                    className={`w-8 h-8 rounded-full ${color} ${newCategory.color === color ? 'ring-2 ring-white ring-offset-2 ring-offset-[#121815]' : ''}`}
                                />
                            ))}
                        </div>
                        <div className="flex justify-end">
                            <button type="submit" className="bg-green-500 text-black font-bold px-6 py-2 rounded-lg">Save</button>
                        </div>
                    </form>
                </div>
            )}

            {/* Categories List */}
            <div className="space-y-4">
                {user.categories && user.categories.map(cat => (
                    <div key={cat._id} className="flex items-center justify-between p-4 bg-[#121815] rounded-xl border border-[#2a3530] group">
                        {editingId === cat._id ? (
                            <div className="flex items-center gap-4 w-full">
                                <input
                                    value={editForm.name}
                                    onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                                    className="bg-[#1a231e] text-white rounded px-2 py-1 border border-[#2a3530]"
                                />
                                <div className="flex gap-2">
                                    {colors.map(color => (
                                        <button
                                            key={color}
                                            type="button"
                                            onClick={() => setEditForm({ ...editForm, color })}
                                            className={`w-6 h-6 rounded-full ${color} ${editForm.color === color ? 'ring-2 ring-white' : ''}`}
                                        />
                                    ))}
                                </div>
                                <div className="ml-auto flex gap-2">
                                    <button onClick={handleUpdate} className="text-green-500 hover:text-green-400"><Check size={18} /></button>
                                    <button onClick={() => setEditingId(null)} className="text-red-500 hover:text-red-400"><X size={18} /></button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-xl ${cat.color} flex items-center justify-center text-white font-bold`}>
                                        {cat.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold">{cat.name}</h3>
                                        <span className={`text-xs px-2 py-0.5 rounded ${cat.type === 'Income' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                            {cat.type}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => startEdit(cat)} className="text-gray-400 hover:text-white"><Edit2 size={18} /></button>
                                    {!cat.isDefault && (
                                        <button onClick={() => handleDelete(cat._id)} className="text-gray-400 hover:text-red-500"><Trash2 size={18} /></button>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoriesSection;
