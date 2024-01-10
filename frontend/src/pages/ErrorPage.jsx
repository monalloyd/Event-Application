import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";
import { useAuth } from "../provider/AuthProvider";

const ErrorPage = () => {
    const navigate = useNavigate();
    const { setAuthData } = useAuth();

    useEffect(() => {
        if(!localStorage.getItem("token") || localStorage.getItem("token") == "" ) {
            setAuthData();
            localStorage.removeItem("roles");
            localStorage.removeItem("token");
            navigate("/", { replace: true });
        }
    }, []);

    return (
        <>
            <h1>Oops!</h1>
            <h3>An error ocurred...</h3>
            <div>Please return {<Link to="/home">HOME</Link>}</div>
            <LogoutButton />
        </>
    );
};
  
export default ErrorPage;