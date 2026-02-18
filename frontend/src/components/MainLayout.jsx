import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, CreditCard, PiggyBank, BarChart3, Settings, Plus, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const MainLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navItems = [
        { path: '/', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/transactions', label: 'Transactions', icon: CreditCard },
        { path: '/budgets', label: 'Budgets', icon: PiggyBank },
        { path: '/subscriptions', label: 'Subscriptions', icon: CreditCard },
        { path: '/reports', label: 'Reports', icon: BarChart3 },
        { path: '/settings', label: 'Settings', icon: Settings },
    ];

    // If on public routes, render only outlet (Landing, Login, Register)
    const publicRoutes = ['/', '/login', '/register'];
    if (publicRoutes.includes(location.pathname)) {
        return (
            <div className="font-sans text-gray-900 bg-white">
                <Outlet />
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-[#121815] text-gray-100 font-sans overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 flex-shrink-0 bg-[#0d1210] border-r border-[#2a3530] flex flex-col">
                <div className="p-6 flex items-center gap-3">
                    <div className="bg-green-500 rounded-full p-1.5">
                        <svg className="w-5 h-5 text-[#0d1210]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" />
                        </svg>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white">FinanceTracker</span>
                </div>

                <div className="px-4 mb-6">
                    <button
                        onClick={() => navigate('/')}
                        className="w-full bg-[#1a231e] hover:bg-[#2a3530] text-green-500 border border-green-900/30 hover:border-green-500/50 transition-all rounded-xl p-3 flex items-center justify-center gap-2 font-medium shadow-lg shadow-green-900/10 group"
                    >
                        <div className="bg-green-500/20 p-1 rounded-md group-hover:bg-green-500 group-hover:text-black transition-colors">
                            <Plus size={18} />
                        </div>
                        <span className="group-hover:text-green-400 transition-colors">Quick Add</span>
                    </button>
                </div>

                <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                    ? 'bg-green-500/10 text-green-500 font-semibold'
                                    : 'text-gray-400 hover:bg-[#1a231e] hover:text-gray-200'
                                    }`}
                            >
                                <Icon size={20} className={isActive ? 'text-green-500' : 'text-gray-500 group-hover:text-gray-300'} />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-[#2a3530]">
                    <div className="flex items-center justify-between gap-2 px-2 py-2 rounded-xl bg-[#1a231e] border border-[#2a3530]">
                        <div className="flex items-center gap-3 overflow-hidden">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-green-500 to-emerald-700 flex flex-shrink-0 items-center justify-center text-white font-bold shadow-lg text-sm">
                                {user?.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">{user?.displayName || 'User'}</p>
                                <p className="text-xs text-green-500 truncate">Free Plan</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                            title="Log Out"
                        >
                            <LogOut size={18} />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-[#121815] relative">
                {/* Top Header Mobile/Desktop */}
                <header className="sticky top-0 z-10 bg-[#121815]/90 backdrop-blur-md border-b border-[#2a3530] px-8 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-white capitalize">
                        {navItems.find(i => i.path === location.pathname)?.label || 'Dashboard'}
                    </h1>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        window.location.href = `/transactions?search=${e.target.value}`;
                                    }
                                }}
                                className="bg-[#1a231e] border border-[#2a3530] text-gray-300 text-sm rounded-full focus:ring-green-500 focus:border-green-500 block w-64 pl-10 p-2.5 placeholder-gray-500 transition-all focus:w-80"
                                placeholder="Search transactions, bills..."
                            />
                        </div>
                        <button className="bg-[#1a231e] p-2.5 rounded-full text-gray-400 hover:text-white hover:bg-[#2a3530] border border-[#2a3530] transition-colors relative">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                            <span className="absolute top-2 right-2.5 block h-2 w-2 rounded-full ring-2 ring-[#1a231e] bg-red-500"></span>
                        </button>
                    </div>
                </header>

                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div >
    );
};

export default MainLayout;
