import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, loading } = useAuth();

    // If not loading, check authentication
    if (!loading) {
        // If authenticated, render children, otherwise redirect to login
        return isAuthenticated ? children : <Navigate to="/login" />;
    }

    // While loading, keep displaying the existing children
    // This assumes that `children` are the current content of the protected route
    return children;
};

export default ProtectedRoute;
