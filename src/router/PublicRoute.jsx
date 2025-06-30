import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";

const PublicRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen flex  justify-center items-center">
                <span className="loading loading-bars loading-xl"></span>
            </div>
        );
    }

    if (user && user.email) {
        // If logged in, redirect to home (or your preferred page)
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    // If not logged in, allow access to public page
    return children;
};

export default PublicRoute;
