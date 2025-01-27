import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


export default function PrivateRoute({ children }: any) {
    const { isLoggedIn } = useAuth();
    const location = useLocation();

    console.log("isLoggedIn:" + isLoggedIn);

    if (!isLoggedIn) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return children;
}