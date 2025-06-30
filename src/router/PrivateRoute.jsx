import React from 'react';
import useAuth from '../hooks/useAuth';
import { useLocation } from 'react-router';

const PrivateRoute = ({children}) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen flex  justify-center items-center">
                <span className="loading loading-bars loading-xl"></span>
            </div>
        );
    }

    if (user && user?.email) {
        return children;
    } else {
        return <Navigate state={location.pathname} to="/login"></Navigate>;
    }
};

export default PrivateRoute;