import Card from "./Card";

const Feed = ({events, onDelete}) => {
    return (
        <>
            {
                events && events.map((event) => (
                    <Card key={event.id} event={event} onDelete={onDelete} />
                ))
            }
        </>
    );
};

export default Feed;