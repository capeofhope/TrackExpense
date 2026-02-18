import React from 'react';

const PreferencesSection = ({ user, onChange, onNotificationChange }) => {
    return (
        <div className="bg-[#1a231e] rounded-xl shadow-lg p-8 border border-[#2a3530]">
            <div className="flex items-center gap-3 mb-6 border-b border-[#2a3530] pb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                <h2 className="text-xl font-bold text-white">Preferences</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                    <h3 className="text-md font-bold text-white mb-2">Currency & Region</h3>
                    <p className="text-sm text-gray-500 mb-4">Select your preferred currency for reports.</p>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Primary Currency</label>
                    <select
                        name="currency"
                        value={user.currency}
                        onChange={onChange}
                        className="block w-full bg-[#121815] border border-[#2a3530] text-white py-3 px-4 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 sm:text-sm appearance-none"
                    >
                        <option value="INR">(₹) INR - Indian Rupee</option>
                        <option value="USD">($) USD - US Dollar</option>
                        <option value="EUR">(€) EUR - Euro</option>
                    </select>
                </div>
            </div>

            <div className="border-t border-[#2a3530] pt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-md font-bold text-white mb-2">Notifications</h3>
                        <p className="text-sm text-gray-500 mb-4">Manage how we communicate with you.</p>
                    </div>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <span className="flex-grow flex flex-col">
                                <span className="text-sm font-medium text-white">Spending Alerts</span>
                                <span className="text-xs text-gray-500">Get notified when you exceed 80% of budget.</span>
                            </span>
                            <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                                <input type="checkbox" name="spendingAlerts" id="spendingAlerts" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" checked={user.notifications.spendingAlerts} onChange={onNotificationChange} />
                                <label htmlFor="spendingAlerts" className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${user.notifications.spendingAlerts ? 'bg-green-500' : 'bg-gray-600'}`}></label>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="flex-grow flex flex-col">
                                <span className="text-sm font-medium text-white">Weekly Reports</span>
                                <span className="text-xs text-gray-500">Receive a summary of your spending every Monday.</span>
                            </span>
                            <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                                <input type="checkbox" name="weeklyReports" id="weeklyReports" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" checked={user.notifications.weeklyReports} onChange={onNotificationChange} />
                                <label htmlFor="weeklyReports" className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${user.notifications.weeklyReports ? 'bg-green-500' : 'bg-gray-600'}`}></label>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="flex-grow flex flex-col">
                                <span className="text-sm font-medium text-white">Bill Reminders</span>
                                <span className="text-xs text-gray-500">Alerts for upcoming recurring payments.</span>
                            </span>
                            <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                                <input type="checkbox" name="billReminders" id="billReminders" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" checked={user.notifications.billReminders} onChange={onNotificationChange} />
                                <label htmlFor="billReminders" className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${user.notifications.billReminders ? 'bg-green-500' : 'bg-gray-600'}`}></label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreferencesSection;
