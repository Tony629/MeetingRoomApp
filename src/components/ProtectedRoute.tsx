import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ element, ...rest }: any) {
    const { isLoggedIn } = useAuth();

    return isLoggedIn ? element : <Navigate to="/login" />
}