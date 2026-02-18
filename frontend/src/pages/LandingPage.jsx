import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, CreditCard, PieChart, Shield, Smartphone, ArrowRight } from 'lucide-react';

const LandingPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user, navigate]);

    return (
        <div className="min-h-screen bg-[#121815] text-white font-sans overflow-hidden">
            {/* Navigation */}
            <nav className="container mx-auto px-6 py-6 flex justify-between items-center relative z-20">
                <div className="flex items-center gap-3">
                    <div className="bg-green-500 rounded-full p-2">
                        <svg className="w-6 h-6 text-[#0d1210]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" />
                        </svg>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white">FinanceTracker</span>
                </div>
                <div className="flex items-center gap-4">
                    <Link to="/login" className="text-gray-400 hover:text-white font-medium transition-colors">
                        Log In
                    </Link>
                    <Link to="/register" className="bg-green-500 hover:bg-green-400 text-black px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-green-900/20 hover:scale-105">
                        Get Started
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="container mx-auto px-6 py-20 md:py-32 flex flex-col md:flex-row items-center relative z-10">
                <div className="md:w-1/2 mb-12 md:mb-0">
                    <div className="inline-flex items-center gap-2 bg-[#1a231e] border border-[#2a3530] rounded-full px-4 py-1.5 mb-8">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        <span className="text-gray-300 text-xs font-medium uppercase tracking-wider">Live Demo Available</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
                        Control your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
                            financial future.
                        </span>
                    </h1>
                    <p className="text-xl text-gray-400 mb-8 max-w-lg leading-relaxed">
                        A powerful, dashboard-style expense tracker designed for clarity. Monitor spending, manage budgets, and track subscriptions in one dark-themed workspace.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link to="/register" className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-black px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-green-900/20 hover:-translate-y-1">
                            Start Dashboard <ArrowRight size={20} />
                        </Link>
                        <Link to="/login" className="flex items-center justify-center gap-2 bg-[#1a231e] hover:bg-[#2a3530] text-gray-300 border border-[#2a3530] px-8 py-4 rounded-xl font-bold text-lg transition-all hover:text-white">
                            Login
                        </Link>
                    </div>
                </div>

                {/* Dashboard Preview / Abstract Visual */}
                <div className="md:w-1/2 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[100px] -z-10"></div>

                    <div className="relative bg-[#0d1210] border border-[#2a3530] rounded-2xl p-6 shadow-2xl skew-y-[-2deg] hover:skew-y-0 transition-transform duration-700">
                        {/* Mock Header */}
                        <div className="flex items-center justify-between mb-8 border-b border-[#2a3530] pb-4">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <div className="h-2 w-20 bg-[#2a3530] rounded-full"></div>
                        </div>

                        {/* Mock Stats */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-[#1a231e] p-4 rounded-xl border border-[#2a3530]">
                                <div className="text-gray-400 text-xs mb-1">Total Balance</div>
                                <div className="text-2xl font-bold text-white">₹1,24,500</div>
                            </div>
                            <div className="bg-[#1a231e] p-4 rounded-xl border border-[#2a3530]">
                                <div className="text-gray-400 text-xs mb-1">Monthly Spent</div>
                                <div className="text-2xl font-bold text-white">₹12,400</div>
                            </div>
                        </div>

                        {/* Mock List */}
                        <div className="space-y-3">
                            {[1, 2, 3].map((_, i) => (
                                <div key={i} className="flex items-center justify-between p-3 bg-[#1a231e] rounded-lg border border-[#2a3530]/50">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${i === 0 ? 'bg-orange-500/20 text-orange-500' : 'bg-blue-500/20 text-blue-500'}`}>
                                            <CreditCard size={14} />
                                        </div>
                                        <div className="h-2 w-24 bg-[#2a3530] rounded-full"></div>
                                    </div>
                                    <div className="h-2 w-12 bg-[#2a3530] rounded-full"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </header>

            {/* Features Section */}
            <section className="container mx-auto px-6 py-24 border-t border-[#2a3530] relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FeatureCard
                        icon={<LayoutDashboard className="text-green-500" />}
                        title="Comprehensive Dashboard"
                        description="Get a bird's eye view of your finances with our intuitive, consolidated dashboard layout."
                    />
                    <FeatureCard
                        icon={<PieChart className="text-blue-500" />}
                        title="Detailed Analytics"
                        description="Visualize spending patterns with interactive charts that match the dashboard's precision."
                    />
                    <FeatureCard
                        icon={<Smartphone className="text-purple-500" />}
                        title="Seamless Sync"
                        description="Access your dashboard from any device. Your financial data is always at your fingertips."
                    />
                </div>
            </section>
        </div>
    );
};

const FeatureCard = ({ icon, title, description }) => (
    <div className="bg-[#1a231e] p-6 rounded-2xl border border-[#2a3530] hover:border-green-500/50 transition-colors group">
        <div className="w-12 h-12 bg-[#121815] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border border-[#2a3530]">
            {icon}
        </div>
        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">
            {description}
        </p>
    </div>
);

export default LandingPage;
