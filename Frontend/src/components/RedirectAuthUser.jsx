import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// redirect authenticated users to profile page
export const RedirectAuthUser = ({ children }) => {
    let { loading, user } = useSelector((state) => state.auth);

    if (!loading && user) {
        return <Navigate to='/profile/data' replace />;
    }

    return children;
}