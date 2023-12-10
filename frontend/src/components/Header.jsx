import { useAuth } from "../provider/AuthProvider";
import { Outlet, useNavigate } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const Header = () => {
    const { roles } = useAuth();
    const navigate = useNavigate();

    const returnHome = () => {
        navigate("/home", { replace: true });  
    }

    const goToCreateEventPage = () => {
        navigate("/new", { replace: true });
    }

    return (
        <>
        <button onClick={returnHome}>Home</button>
        {
            !roles.includes("ROLE_ADMIN") && <>
            <button>My Events</button>
            <button onClick={goToCreateEventPage}>Create Event</button>
            </>
        }
        {
            roles.includes("ROLE_ADMIN") && <button>Admin Panel</button>
        }
        <LogoutButton />
        <Outlet />
        </>
    )
};

export default Header;