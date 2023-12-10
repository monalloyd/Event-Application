import { Link } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";

const ErrorPage = () => {
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