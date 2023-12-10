import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import { fetchToken } from "../api/api";

const LoginPage = () => {
    const { setAuthData } = useAuth();
    const navigate = useNavigate();
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ errorMessage, setErrorMessage ] = useState(null);
  
    const handleLogin = (e) => {
        e.preventDefault();
        
        fetchToken(username, password)
        .then(response => {
            if (!response.ok) {
                if (response.status === 401) {
                    const message = "Password and username don't match";
                    setErrorMessage(message);
                    throw new Error(message);
                }
                throw new Error("Failed to update headers");
            }
            return response.json();
            })
            .then((response) => {
                setErrorMessage(null);
                localStorage.setItem("token", response.token);
                localStorage.setItem("roles", response.roles);
                setAuthData(response.token, response.roles);
                if(response.roles.join(" ").includes("ADMIN")) {
                    navigate("/admin", { replace: true });
                } else {
                    navigate("/home", { replace: true });
                }
            })
            .catch((error) => {
                console.error("Error:", error.message);
            });
    };
  
    return (
        <>
        <h1>Login Page</h1>
        <form>
            <div className="form-error-message">{errorMessage && errorMessage}</div>
            <div className="input-container">
                <label>Username </label>
                <input type="text" name="username" onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div className="input-container">
                <label>Password </label>
                <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="button-container">
                <button type="button" onClick={(e) => handleLogin(e)}>Login</button>
            </div>
            <div>No account? { <Link to="/register">Register here.</Link> }</div>
        </form>
        </>
    );
};
  
export default LoginPage;