import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function PrivateRoute() {
    const { user } = useAuth();
    return user ? <Outlet /> : <Navigate to="/login" replace />;
}
