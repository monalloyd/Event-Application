import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../api/api";

const RegisterPage = () => {
    const navigate = useNavigate();
    const [ username, setUsername ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ errorMessage, setErrorMessage ] = useState(null);

    const handleRegistering = (e) => {
        e.preventDefault();
        const body = {
            username,
            email,
            password
        };

        console.log("registering...");
        
        register(body)
        //.then(response => response.json())
        .then((response) => {
            console.log(response.body.toString());
            if (!response.isOk) {
                setErrorMessage(response.message);
                throw new Error(response.message);
            } else {
                setErrorMessage(null);
                navigate("/login", { replace: true });
            }
        })
        .catch((err) => {
            console.error("Error:", err.message);
        });
    };

    return (
        <>
            <h1>Registering</h1>
            <form>
            <div className="form-error-message">{errorMessage && errorMessage}</div>
            <div className="input-container">
                <label>Username </label>
                <input type="text" name="username" onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div className="input-container">
                <label>Email </label>
                <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="input-container">
                <label>Password </label>
                <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="button-container">
                <button type="button" onClick={(e) => handleRegistering(e)}>Register</button>
            </div>
            <div>Already have an account? { <Link to="/login">Login here.</Link> }</div>
        </form>
        </>
    );
};

export default RegisterPage;