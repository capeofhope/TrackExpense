import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();

    return (
        <nav className="bg-[#1a231e] border-b border-[#2a3530]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 flex items-center gap-2">
                            <div className="bg-green-500 rounded-full p-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h1 className="text-xl font-bold text-white">FinanceTracker</h1>
                        </div>
                        <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
                            <Link
                                to="/"
                                className={`${location.pathname === '/' ? 'text-white' : 'text-gray-400 hover:text-white'} px-3 py-2 rounded-md text-sm font-medium transition-colors`}
                            >
                                Dashboard
                            </Link>
                            <Link
                                to="/expenses"
                                className={`${location.pathname === '/expenses' ? 'text-white' : 'text-gray-400 hover:text-white'} px-3 py-2 rounded-md text-sm font-medium transition-colors`}
                            >
                                Expenses
                            </Link>
                            <Link
                                to="/reports"
                                className={`${location.pathname === '/reports' ? 'text-white' : 'text-gray-400 hover:text-white'} px-3 py-2 rounded-md text-sm font-medium transition-colors`}
                            >
                                Reports
                            </Link>
                            <Link
                                to="/settings"
                                className={`${location.pathname === '/settings' ? 'text-green-500' : 'text-gray-400 hover:text-white'} px-3 py-2 rounded-md text-sm font-medium transition-colors`}
                            >
                                Settings
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button className="text-gray-400 hover:text-white">
                            <span className="sr-only">View notifications</span>
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                        </button>
                        <button className="text-gray-400 hover:text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button>
                        <div className="flex-shrink-0">
                            <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center border-2 border-white overflow-hidden">
                                <img src="https://i.pravatar.cc/150?img=12" alt="User" className="h-full w-full object-cover" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
