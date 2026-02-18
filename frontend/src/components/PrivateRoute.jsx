import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div className="min-h-screen bg-[#121815] flex items-center justify-center text-green-500">Loading...</div>;
    }

    return user ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
