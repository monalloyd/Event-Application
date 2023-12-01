const Feed = ({events}) => {
    return (
        <>
            {
                events && events.map((event) => (
                    <div key={event.id} data-user={event.userId}>{event.id}, {event.time}, {event.eventType}</div>
                ))
            }
        </>
    );
};

export default Feed;