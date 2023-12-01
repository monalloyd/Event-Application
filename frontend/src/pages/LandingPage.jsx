import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const navigate = useNavigate();
  
    const handleNavigate = (path) => {
        navigate(`/${path}`, { replace: true });
        
    };
  
    return (
        <>
        <h1>Welcome!</h1>
        <button onClick={() => handleNavigate("login")}>Login</button>
        <button onClick={() => handleNavigate("register")}>Register</button>
        </>
    );
};
  
export default LandingPage;