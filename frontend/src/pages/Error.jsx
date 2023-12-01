import { Link } from "react-router-dom";

const Error = () => {
    return (
        <>
            <h1>Oops!</h1>
            <h3>An error ocurred...</h3>
            <div>Please return {<Link to="/">HOME</Link>}</div>
        </>
    );
};
  
export default Error;