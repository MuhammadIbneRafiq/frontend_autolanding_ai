import { Navigate } from "react-router-dom";
import React from "react";
import { useAuth } from "@/hooks/useAuth";

export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? <Navigate to="/" /> : children;
};
