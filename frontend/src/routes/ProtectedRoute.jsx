import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";

export const ProtectedRoute = ({role}) => {
    const { token, roles } = useAuth();
  
    if (!token) {
      return <Navigate to="/login" />;
    }

    if(!roles.includes(role)) {
      return <Navigate to="/home" />;
    }

    return <Outlet />;
};