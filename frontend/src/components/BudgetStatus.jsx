import React from 'react';

const BudgetStatus = ({ budgets = [], expenses = [] }) => {

    const processedBudgets = budgets.map(budget => {
        const spent = expenses
            .filter(e => e.category === budget.category)
            .reduce((sum, e) => sum + e.amount, 0);
        return { ...budget, spent };
    });

    const totalBudget = processedBudgets.reduce((sum, b) => sum + b.limit, 0);
    const totalSpent = processedBudgets.reduce((sum, b) => sum + b.spent, 0);
    const totalPercentage = totalBudget > 0 ? Math.min((totalSpent / totalBudget) * 100, 100) : 0;

    return (
        <div className="bg-[#1a231e] rounded-2xl p-6 border border-[#2a3530]">
            <h3 className="text-lg font-bold text-white mb-6">Budget Status</h3>
            {processedBudgets.length === 0 ? (
                <p className="text-gray-500 text-sm">No budgets set. Go to Budgets page to add one.</p>
            ) : (
                <div className="space-y-6">
                    {processedBudgets.slice(0, 3).map((budget, index) => (
                        <div key={index}>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="font-medium text-white">{budget.category}</span>
                                <span className="text-gray-400">
                                    <span className="text-white font-bold">₹{budget.spent.toFixed(0)}</span> / ₹{budget.limit}
                                </span>
                            </div>
                            <div className="w-full bg-[#121815] rounded-full h-2">
                                <div
                                    className={`h-2 rounded-full ${budget.color || 'bg-green-500'}`}
                                    style={{ width: `${Math.min((budget.spent / budget.limit) * 100, 100)}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div className="mt-6 pt-6 border-t border-[#2a3530] flex items-center justify-between">
                <div className="relative w-16 h-16 rounded-full border-4 border-[#2a3530] flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-4 border-green-500 border-t-transparent trnasform rotate-45" style={{ clipPath: `inset(0 ${100 - totalPercentage}% 0 0)` }}></div>
                    {/* Simple CSS Hack for circle progress, utilizing conic-gradient would be better but keeping it simple with text for now as tailwind config might be limited */}
                    <span className="text-xs font-bold text-white">{Math.round(totalPercentage)}%</span>
                </div>
                <div className="flex-1 ml-4">
                    <p className="text-sm font-bold text-white">Total Budget Used</p>
                    <p className="text-xs text-gray-500">
                        {totalPercentage < 80 ? "You are doing well!" : "Watch your spending!"}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BudgetStatus;
