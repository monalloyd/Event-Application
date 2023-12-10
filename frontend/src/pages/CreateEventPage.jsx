import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import { createEvent } from "../api/api";
import EventForm from "../components/EventForm";

const CreateEventPage = () => {
    const { token } = useAuth();
    const navigate = useNavigate();

    const saveEvent = (event) => {
        createEvent(event, token)
        .then(() => {
            navigate("/home", {replace : true});
        })
        .catch((err) => console.log("Error saving data: " + err))
    };

    return (
        <div className="content">
            <EventForm
                onSave={saveEvent}
                onCancel={() => navigate("/")}
            />
        </div>
    );
};

export default CreateEventPage;