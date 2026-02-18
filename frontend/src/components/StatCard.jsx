import React from 'react';

const StatCard = ({ title, amount, percentage, trend, icon: Icon, color }) => {
    return (
        <div className="bg-[#1a231e] rounded-2xl p-6 border border-[#2a3530]">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <p className="text-gray-400 text-sm font-medium">{title}</p>
                    <h3 className="text-2xl font-bold text-white mt-1">
                        {amount}
                    </h3>
                </div>
                <div className={`p-3 rounded-xl ${color} bg-opacity-20`}>
                    <Icon size={24} className={color.replace('bg-', 'text-')} />
                </div>
            </div>
            <div className="flex items-center gap-2">
                <span className={`text-sm font-medium px-2 py-0.5 rounded-full ${trend === 'up' ? 'text-green-500 bg-green-500/10' : 'text-red-500 bg-red-500/10'}`}>
                    {trend === 'up' ? '+' : ''}{percentage}
                </span>
                <span className="text-gray-500 text-sm">vs last month</span>
            </div>
        </div>
    );
};

export default StatCard;
