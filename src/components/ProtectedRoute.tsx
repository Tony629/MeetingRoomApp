import { Navigate, useLocation } from "react-router-dom";
import Cookies from 'js-cookie';
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children }: any) {
    //const { isLoggedIn } = useAuth(); 浏览器刷新后会导致重新登录
    const location = useLocation();
    const isAuthenticated = Cookies.get('isAuthenticated');

    console.log("isAuthenticated:" + isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return children;
}