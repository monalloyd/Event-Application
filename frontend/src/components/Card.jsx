const Card = ({ event }) => {
    return (
        <div className="card">
            <div className="card-tag-container">
                <div className="card-tag">{event.eventType}</div>
            </div>
            <div className="card-event-venue">{event.venue}</div>
            <div className="card-address">{event.location.street}</div>
            <div className="card-address">{`${event.location.zipcode} ${event.location.city}, ${event.location.country}`}</div>
            {/* <div className="card-user">{event.user.name}</div> */}
            <div className="card-description">{event.description}</div>
            {/* <button className="card-button edit">edit</button> */}
            {/* <button className="card-button delete" onClick={() => onDelete(event.id)}>delete</button> */}
        </div>
    );
};

export default Card;