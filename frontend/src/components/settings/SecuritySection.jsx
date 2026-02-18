import React, { useState } from 'react';
import { updatePassword } from '../../api/client';

const SecuritySection = ({ user, onSecurityChange }) => {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [message, setMessage] = useState({ type: '', text: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdatePassword = async () => {
        setMessage({ type: '', text: '' });
        if (formData.newPassword !== formData.confirmPassword) {
            setMessage({ type: 'error', text: 'New passwords do not match' });
            return;
        }
        if (formData.newPassword.length < 6) {
            setMessage({ type: 'error', text: 'Password must be at least 6 characters' });
            return;
        }

        setLoading(true);
        try {
            await updatePassword({
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword
            });
            setMessage({ type: 'success', text: 'Password updated successfully' });
            setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (err) {
            setMessage({ type: 'error', text: err.response?.data || 'Failed to update password' });
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="bg-[#1a231e] rounded-xl shadow-lg p-8 border border-[#2a3530]">
            <div className="flex items-center gap-3 mb-6 border-b border-[#2a3530] pb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <h2 className="text-xl font-bold text-white">Security</h2>
            </div>

            <div className="mb-8">
                <h3 className="text-md font-bold text-white mb-4 uppercase tracking-wider text-xs">Change Password</h3>
                <div className="space-y-4">
                    {message.text && (
                        <div className={`p-3 rounded-lg text-sm ${message.type === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                            {message.text}
                        </div>
                    )}
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Current Password</label>
                        <input
                            type="password"
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            placeholder="••••••••"
                            className="block w-full bg-[#121815] border border-[#2a3530] text-white py-3 px-4 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">New Password</label>
                        <input
                            type="password"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            className="block w-full bg-[#121815] border border-[#2a3530] text-white py-3 px-4 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Confirm New Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="block w-full bg-[#121815] border border-[#2a3530] text-white py-3 px-4 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 sm:text-sm"
                        />
                    </div>
                    <button
                        onClick={handleUpdatePassword}
                        disabled={loading}
                        className="bg-[#2a3530] hover:bg-[#36423c] text-white text-sm font-medium px-4 py-2 rounded-md border border-gray-600 transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Updating...' : 'Update Password'}
                    </button>
                </div>
            </div>

            <div className="bg-[#121815] p-6 rounded-lg border border-[#2a3530] flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="bg-green-900 rounded-lg p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-md font-bold text-white">Two-Factor Authentication</h3>
                        <p className="text-sm text-gray-500">Add an extra layer of security to your account by requiring a code when logging in.</p>
                    </div>
                </div>
                <div className="flex items-center">
                    <span className="mr-3 text-sm text-gray-400 font-medium">{user.security?.twoFactorEnabled ? 'Enabled' : 'Enable 2FA'}</span>
                    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                        <input type="checkbox" name="twoFactorEnabled" id="twoFactorEnabled" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" checked={user.security?.twoFactorEnabled || false} onChange={onSecurityChange} />
                        <label htmlFor="twoFactorEnabled" className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${user.security?.twoFactorEnabled ? 'bg-green-500' : 'bg-gray-600'}`}></label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SecuritySection;
