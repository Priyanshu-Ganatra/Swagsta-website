import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// protect routes that require authentication
export const ProtectedRoute = ({ children }) => {
    let { loading, user } = useSelector((state) => state.auth);

    if (!loading && !user) {
        return <Navigate to='/login' replace />;
    }

    return children;
};