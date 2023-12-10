import { useEffect, useState } from "react";

const EventForm = ({event, onSave, onCancel}) => {
    const [ eventType, setEventType ] = useState("");
    const [ time, setTime ] = useState("");
    const [ venue, setVenue ] = useState("");
    const [ street, setStreet ] = useState("");
    const [ zipcode, setZipcode ] = useState("");
    const [ city, setCity ] = useState("");
    const [ state, setState ] = useState("");
    const [ country, setCountry ] = useState("");
    const [ description, setDescription ] = useState("");

    useEffect(() => {
        if(event){
            setEventType(entry[0].eventType);
            setTime(entry[0].time);
            setVenue(entry[0].venue);
            setStreet(entry[0].location.street);
            setZipcode(entry[0].location.zipcode);
            setCity(entry[0].location.city);
            setState(entry[0].location.state);
            setCountry(entry[0].location.country);
            setDescription(entry[0].description);
        }
    }, [])

    const onSubmit = (e) => {
        e.preventDefault();

        const location = {
            street,
            zipcode,
            city,
            state,
            country
        };
        
        if (event) {
            return onSave({
                _id: event[0]._id,
                venue,
                time,
                eventType,
                location,
                description
            });
        }
    
        return onSave({
            venue,
            time,
            eventType,
            location,
            description
        });
    }

    return (
        <>
         <form>
            <div>
                <label htmlFor="event-type">Event Type: </label>
                <input type="text" id="event-type" name="event-type" value={eventType} onChange={(e) => setEventType(e.target.value)} />
            </div>
            <div>
                <label htmlFor="time">Date & Time: </label>
                    <input type="datetime-local"
                        id="time"
                        name="time" 
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
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
                <label htmlFor="description">Description: </label>
                <input type="text" id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div>
                <button type="button" onClick={onSubmit}>Create Event</button>
            </div>
            <div>
                <button type="button" onClick={onCancel}>Cancel</button>
            </div>
        </form>   
        </>
    );
}

export default EventForm;