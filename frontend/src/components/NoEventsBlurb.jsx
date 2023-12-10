import { useNavigate } from "react-router-dom";

const NoEventsBlurb = () => {
    const navigate = useNavigate();

    const goToCreateEventPage = () => {
        navigate("/new", { replace: true });
    };

    return (
        <>
            <div>No events?</div>
            <button onClick={goToCreateEventPage}>Create one!</button>
        </>
    );
};

export default NoEventsBlurb;