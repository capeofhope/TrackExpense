import React from 'react';

const DataSection = () => {
    return (
        <div className="bg-[#1a231e] rounded-xl shadow-lg p-8 border border-[#2a3530]">
            <div className="flex items-center gap-3 mb-6 border-b border-[#2a3530] pb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
                <h2 className="text-xl font-bold text-white">Data & Privacy</h2>
            </div>

            <div className="space-y-4 mb-8">
                <div className="bg-[#121815] p-4 rounded-lg border border-[#2a3530] flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="bg-[#2a3530] rounded-lg p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-md font-bold text-white">Export Data</h3>
                            <p className="text-sm text-gray-500">Download all your transactions and settings in JSON or CSV format.</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button className="bg-[#2a3530] hover:bg-[#36423c] text-white text-xs font-bold px-3 py-1 rounded transition-colors uppercase">JSON</button>
                        <button className="bg-[#2a3530] hover:bg-[#36423c] text-white text-xs font-bold px-3 py-1 rounded transition-colors uppercase">CSV</button>
                    </div>
                </div>

                <div className="bg-[#121815] p-4 rounded-lg border border-[#2a3530] flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="bg-[#2a3530] rounded-lg p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-md font-bold text-white">Restore Backup</h3>
                            <p className="text-sm text-gray-500">Upload a previous backup file to restore your account state.</p>
                        </div>
                    </div>
                    <button className="bg-[#2a3530] hover:bg-[#36423c] text-white text-xs font-bold px-4 py-2 rounded transition-colors border border-gray-600">
                        Upload File
                    </button>
                </div>
            </div>

            <div>
                <h3 className="text-md font-bold text-red-500 mb-2">Danger Zone</h3>
                <div className="bg-[#121815] p-4 rounded-lg border border-red-900/30 flex items-center justify-between">
                    <p className="text-sm text-gray-400">Once you delete your account, there is no going back. Please be certain.</p>
                    <button className="bg-red-900/20 hover:bg-red-900/40 text-red-500 text-sm font-medium px-4 py-2 rounded border border-red-900/50 transition-colors">
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DataSection;
