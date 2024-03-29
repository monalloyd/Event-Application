import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";

const LogoutButton = () => {
    const { setAuthData } = useAuth();
    const navigate = useNavigate();
  
    const handleLogout = () => {
        setAuthData();
        localStorage.removeItem("token");
        localStorage.removeItem("roles");
        navigate("/", { replace: true });
    };
  
    return <button onClick={handleLogout}>Sign out</button>;
};
  
export default LogoutButton;