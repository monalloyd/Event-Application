import { useAuth } from "../provider/AuthProvider";

const Card = ({ event, onDelete }) => {
    const { roles } = useAuth();

    return (
        <div className="card">
            <div className="card-tag-container">
                <div className="card-tag">{event.eventType}</div>
            </div>
            <div className="card-event-venue">{event.venue}</div>
            <div className="card-address">{event.location.street}</div>
            <div className="card-address">{`${event.location.zipcode} ${event.location.city}, ${event.location.country}`}</div>
            <div className="card-description">{event.description}</div>
            {
                roles.includes("ROLE_ADMIN") && <button 
                    className="card-button delete" 
                    onClick={() => onDelete(event.id)}>delete</button>
            }
        </div>
    );
};

export default Card;