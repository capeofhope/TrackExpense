import React, { useState, useEffect } from 'react';
import SpendingTrendsChart from '../components/SpendingTrendsChart';
import { getExpenses } from '../api/client';
import { Download, Calendar, FileText } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const Reports = () => {
    const [expenses, setExpenses] = useState([]);
    const [dateRange, setDateRange] = useState(30);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const res = await getExpenses();
                setExpenses(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchExpenses();
    }, []);

    const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
    // Mocking income for now as there's no income tracking feature yet
    const totalIncome = 50000;
    const netSavings = totalIncome - totalExpenses;

    const handleExportCSV = () => {
        const headers = ["Date", "Category", "Description", "Amount (INR)"];
        const rows = expenses.map(e => [
            new Date(e.date).toLocaleDateString(),
            e.category,
            e.description,
            e.amount
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'financial_report.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleExportPDF = () => {
        const doc = new jsPDF();

        // Add Title
        doc.setFontSize(18);
        doc.text("Financial Report", 14, 22);
        doc.setFontSize(11);
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);

        // Summary
        doc.text(`Total Income: ${totalIncome.toFixed(2)}`, 14, 40);
        doc.text(`Total Expenses: ${totalExpenses.toFixed(2)}`, 14, 46);
        doc.text(`Net Savings: ${netSavings.toFixed(2)}`, 14, 52);

        // Table
        const tableColumn = ["Date", "Category", "Description", "Amount"];
        const tableRows = [];

        expenses.forEach(expense => {
            const expenseData = [
                new Date(expense.date).toLocaleDateString(),
                expense.category,
                expense.description,
                expense.amount.toFixed(2),
            ];
            tableRows.push(expenseData);
        });

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 60,
        });

        doc.save("financial_report.pdf");
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-white">Financial Reports</h1>
                    <p className="text-gray-400">Deep dive into your spending habits.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => setDateRange(prev => prev === 7 ? 30 : 7)}
                        className="flex items-center gap-2 bg-[#1a231e] hover:bg-[#2a3530] text-gray-300 border border-[#2a3530] px-4 py-2 rounded-lg transition-colors"
                    >
                        <Calendar size={18} />
                        {dateRange === 30 ? 'Last 30 Days' : 'Last 7 Days'}
                    </button>
                    <button
                        onClick={handleExportPDF}
                        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-black font-bold px-4 py-2 rounded-lg transition-colors"
                    >
                        <Download size={18} /> Export PDF
                    </button>
                </div>
            </div>

            {/* Top Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#1a231e] p-6 rounded-2xl border border-[#2a3530]">
                    <p className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">Total Income</p>
                    <h3 className="text-3xl font-bold text-white">₹{totalIncome.toFixed(2)}</h3>
                    <p className="text-xs text-gray-500 mt-1">Estimated monthly</p>
                </div>
                <div className="bg-[#1a231e] p-6 rounded-2xl border border-[#2a3530]">
                    <p className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">Total Expenses</p>
                    <h3 className="text-3xl font-bold text-white">₹{totalExpenses.toFixed(2)}</h3>
                </div>
                <div className="bg-[#1a231e] p-6 rounded-2xl border border-[#2a3530]">
                    <p className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">Net Savings</p>
                    <h3 className={`text-3xl font-bold ${netSavings >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        ₹{netSavings.toFixed(2)}
                    </h3>
                </div>
            </div>

            {/* Main Chart */}
            <div className="bg-[#1a231e] p-6 rounded-2xl border border-[#2a3530]">
                <h3 className="text-lg font-bold text-white mb-6">Income vs Expense ({dateRange} Days)</h3>
                <div className="h-80">
                    <SpendingTrendsChart
                        expenses={expenses}
                        days={dateRange}
                        income={totalIncome}
                    />
                </div>
            </div>

            {/* Export Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div
                    onClick={handleExportPDF}
                    className="bg-[#1a231e] p-6 rounded-2xl border border-[#2a3530] hover:border-green-500/50 transition-colors group cursor-pointer"
                >
                    <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center mb-4 group-hover:bg-red-500/20 transition-colors">
                        <span className="text-red-500 font-bold text-xl">PDF</span>
                    </div>
                    <h3 className="text-white font-bold text-lg mb-1">Export as PDF</h3>
                    <p className="text-gray-400 text-sm mb-4">Best for printing and sharing with external parties.</p>
                    <span className="text-green-500 text-sm font-medium group-hover:underline">Download Now &rarr;</span>
                </div>

                <div
                    onClick={handleExportCSV}
                    className="bg-[#1a231e] p-6 rounded-2xl border border-[#2a3530] hover:border-green-500/50 transition-colors group cursor-pointer"
                >
                    <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-4 group-hover:bg-green-500/20 transition-colors">
                        <span className="text-green-500 font-bold text-xl">CSV</span>
                    </div>
                    <h3 className="text-white font-bold text-lg mb-1">Export as CSV</h3>
                    <p className="text-gray-400 text-sm mb-4">Raw data for analysis in Excel or Google Sheets.</p>
                    <span className="text-green-500 text-sm font-medium group-hover:underline">Download Now &rarr;</span>
                </div>
            </div>
        </div>
    );
};

export default Reports;
