const TableFeed = ({events, onDelete}) => {
    return (
        <table>
            {
                events && events.map((event) => (
                    <tr key={event.id}>
                        <span>{event.eventType}</span>
                        <span>{event.venue}</span>
                        <span>{event.time}</span>
                        <span>{event.location.street}, {event.location.zipcode}, {event.location.city}, {event.location.state}, {event.location.country} </span>
                        <span>{event.description}</span>
                        <button onClick={onDelete}>Delete</button>
                    </tr>
                ))
            }
        </table>
    );
};

export default TableFeed;