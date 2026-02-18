import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import ProfileSection from '../components/settings/ProfileSection';
import PreferencesSection from '../components/settings/PreferencesSection';
import SecuritySection from '../components/settings/SecuritySection';
import DataSection from '../components/settings/DataSection';
import CategoriesSection from '../components/settings/CategoriesSection';
import { getUser, updateUser } from '../api/client';

const Settings = () => {
    const [activeSection, setActiveSection] = useState('profile');
    const [user, setUser] = useState({
        displayName: '',
        email: '',
        bio: '',
        currency: 'INR',
        notifications: {
            spendingAlerts: true,
            weeklyReports: false,
            billReminders: true
        },
        security: {
            twoFactorEnabled: false
        }
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const res = await getUser();
            setUser(prev => ({
                ...prev,
                ...res.data,
                security: res.data.security || { twoFactorEnabled: false }
            }));
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };

    const handleNotificationChange = (e) => {
        const { name, checked } = e.target;
        setUser(prev => ({
            ...prev,
            notifications: { ...prev.notifications, [name]: checked }
        }));
    };

    const handleSecurityChange = (e) => {
        const { name, checked } = e.target;
        setUser(prev => ({
            ...prev,
            security: { ...prev.security, [name]: checked }
        }));
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await updateUser(user);
        } catch (err) {
            console.error("Failed to save", err);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-[#121815] flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
    );

    const renderSection = () => {
        switch (activeSection) {
            case 'profile':
                return <ProfileSection user={user} onChange={handleChange} onSave={handleSave} saving={saving} />;
            case 'preferences':
                return <PreferencesSection user={user} onChange={handleChange} onNotificationChange={handleNotificationChange} />;
            case 'security':
                return <SecuritySection user={user} onSecurityChange={handleSecurityChange} />;
            case 'categories':
                return <CategoriesSection user={user} onUpdate={(cats) => setUser({ ...user, categories: cats })} />;
            case 'data':
                return <DataSection />;
            default:
                return <ProfileSection user={user} onChange={handleChange} onSave={handleSave} saving={saving} />;
        }
    };

    return (
        <div className="min-h-screen bg-[#121815] text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white">Settings</h1>
                    <p className="text-gray-400 mt-2">Manage your account settings and preferences.</p>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="w-full md:w-64 flex-shrink-0">
                        <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                        {renderSection()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
