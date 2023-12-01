import { useState } from "react";

const Filter = () => {
    const [ eventType, setEventType ] = useState("");
    const [ date, setDate ] = useState("")
    const [ venue, setVenue ] = useState("");
    const [ street, setStreet ] = useState("");
    const [ zipcode, setZipCode ] = useState("");
    const [ city, setCity ] = useState("");
    const [ state, setState ] = useState("");
    const [ country, setCountry ] = useState("");

    return (
        <>
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
                <button type="button" onClick={(e) => handleLogin(e)}>Apply Filters</button>
            </div>
        </form>   
        </>
    );
};

export default Filter;