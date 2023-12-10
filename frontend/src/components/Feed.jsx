import Card from "./Card";

const Feed = ({events}) => {
    return (
        <>
            {
                events && events.map((event) => (
                    <Card key={event.id} event={event} />
                ))
            }
        </>
    );
};

export default Feed;