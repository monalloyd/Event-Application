import { useState } from "react";

const Filter = ({ setShowFilter, applyFilters }) => {
    const [ eventType, setEventType ] = useState("");
    const [ start, setStart ] = useState("");
    const [ end, setEnd ] = useState("");
    const [ venue, setVenue ] = useState("");
    const [ street, setStreet ] = useState("");
    const [ zipcode, setZipcode ] = useState("");
    const [ city, setCity ] = useState("");
    const [ state, setState ] = useState("");
    const [ country, setCountry ] = useState("");

    const submitFilters = (e) => {
        e.preventDefault();
        setShowFilter(false);
        
        return applyFilters({
            eventType,
            start,
            end,
            venue,
            street,
            zipcode,
            city,
            state,
            country
        });
    }

    const handleCancel = (e) => {
        e.preventDefault();
        setShowFilter(false);
    }

    return (
        <>
         <form>
            <div>
                <label htmlFor="event-type">Event Type: </label>
                <input type="text" id="event-type" name="event-type" value={eventType} onChange={(e) => setEventType(e.target.value)} />
            </div>
            <div>
                <label htmlFor="start">Events After: </label>
                    <input type="datetime-local"
                        id="start"
                        name="start" 
                        value={start}
                        onChange={(e) => setStart(e.target.value)}
                    />
            </div>
            <div>
                <label htmlFor="end">Events Before: </label>
                    <input type="datetime-local"
                        id="end"
                        name="end" 
                        value={end}
                        onChange={(e) => setEnd(e.target.value)}
                    />
            </div>
            <div>
                <label htmlFor="venue">Venue Name: </label>
                <input type="text" id="venue" name="venue" value={venue} onChange={(e) => setVenue(e.target.value)} />
            </div>
            <div>
                <label htmlFor="street">Street: </label>
                <input type="text" id="street" name="street" value={street} onChange={(e) => setStreet(e.target.value)} />
            </div>
            <div>
                <label htmlFor="zipcode">Zip/Postal Code: </label>
                <input type="text" id="zipcode" name="zipcode" value={zipcode} onChange={(e) => setZipcode(e.target.value)} />
            </div>
            <div>
                <label htmlFor="city">City: </label>
                <input type="text" id="city" name="city" value={city} onChange={(e) => setCity(e.target.value)} />
            </div>
            <div>
                <label htmlFor="state">State: </label>
                <input type="text" id="state" name="state" value={state} onChange={(e) => setState(e.target.value)} />
            </div>
            <div>
                <label htmlFor="country">Country: </label>
                <input type="text" id="country" name="country" value={country} onChange={(e) => setCountry(e.target.value)} />
            </div>
            <div>
                <button type="button" onClick={(e) => submitFilters(e)}>Apply Filters</button>
            </div>
            <div>
                <button type="button" onClick={(e) => handleCancel(e)}>Cancel</button>
            </div>
        </form>   
        </>
    );
};

export default Filter;