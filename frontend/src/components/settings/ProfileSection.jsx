import React from 'react';

const ProfileSection = ({ user, onChange, onSave, saving }) => {
    return (
        <div className="bg-[#1a231e] rounded-xl shadow-lg p-8 border border-[#2a3530]">
            <div className="flex items-start justify-between mb-8">
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center border-4 border-[#121815] overflow-hidden">
                            <img src="https://i.pravatar.cc/150?img=12" alt="Profile" className="h-full w-full object-cover" />
                        </div>
                        <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-1 border-2 border-[#121815] cursor-pointer">
                            <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white">{user.displayName || 'User'}</h2>
                        <p className="text-gray-400 text-sm">{user.email}</p>
                        <span className="inline-block bg-green-900 text-green-400 text-xs px-2 py-0.5 rounded mt-1 border border-green-700 font-medium">PRO PLAN</span>
                    </div>
                </div>
                <button className="bg-[#2a3530] hover:bg-[#36423c] text-white text-sm font-medium px-4 py-2 rounded-md border border-gray-600 transition-colors">
                    View Public Profile
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Display Name</label>
                    <input
                        type="text"
                        name="displayName"
                        value={user.displayName}
                        onChange={onChange}
                        className="block w-full bg-[#121815] border border-[#2a3530] text-white py-3 px-4 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={onChange}
                        className="block w-full bg-[#121815] border border-[#2a3530] text-white py-3 px-4 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 sm:text-sm"
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-400 mb-2">Monthly Income (Estimated)</label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">₹</span>
                        <input
                            type="number"
                            name="monthlyIncome"
                            value={user.monthlyIncome}
                            onChange={onChange}
                            className="block w-full bg-[#121815] border border-[#2a3530] text-white py-3 pl-8 pr-4 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 sm:text-sm"
                        />
                    </div>
                </div>
            </div>

            <div className="mb-8">
                <label className="block text-sm font-medium text-gray-400 mb-2">Bio</label>
                <textarea
                    name="bio"
                    rows={4}
                    value={user.bio}
                    onChange={onChange}
                    className="block w-full bg-[#121815] border border-[#2a3530] text-gray-300 py-3 px-4 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 sm:text-sm"
                />
            </div>

            <div className="flex justify-end">
                <button
                    onClick={onSave}
                    disabled={saving}
                    className={`bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-6 rounded-lg shadow-lg transform transition hover:scale-105 ${saving ? 'opacity-75 cursor-wait' : ''}`}
                >
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>
        </div>
    );
};

export default ProfileSection;
