import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Cookies from 'js-cookie';

export default function PrivateRoute({ element, ...rest }: any) {
    const { isLoggedIn } = useAuth();

    const isAuthenticated = Cookies.get('isAuthenticated');

    console.log("isLoggedIn:" + isAuthenticated);

    return isLoggedIn ? element : <Navigate to="/login" />
}