import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const navigate = useNavigate();
  
    const handleNavigate = (path) => {
        navigate(`/${path}`, { replace: true });  
    };
  
    return (
        <>
            <h2>The No. 1 Meet-Up Service for Artists</h2>
            <h1>Welcome</h1>
            <div>Already have an account?</div>
            <div><button onClick={() => handleNavigate("login")}>Login</button></div>
            <div>New to the site?</div>
            <div><button onClick={() => handleNavigate("register")}>Register</button></div>
        </>
    );
};
  
export default LandingPage;