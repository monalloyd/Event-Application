import { useEffect, useState } from "react";
import { fetchEventsByUser } from "../api/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import TableFeed from "../components/TableFeed";
import NoEventsBlurb from "../components/NoEventsBlurb";

const UserEventsPage = () => {
    const navigate = useNavigate();
    const { token, setAuthData } = useAuth();
    const [ events, setEvents ] = useState([]);
    const [ fetchToggl, setFetchToggl ] = useState(false);

    useEffect(() => {
        fetchEventsByUser(token)
        .then(res => res.json())
        .then((data) => {
            setEvents(data);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            if(!localStorage.getItem("token") || localStorage.getItem("token") == "" ) {
                setAuthData();
                localStorage.removeItem("roles");
                localStorage.removeItem("token");
                navigate("/", { replace: true });
            }
        });
    }, [fetchToggl]);

    const onDelete = (id) => {
        deleteEvent(id, token)
        .then(() => {
            fetchToggl ? setFetchToggl(false) : setFetchToggl(true);
        })
        .catch(err => console.log("Error deleteing data: " + err));
    }

    return (
        <>
            <div>
                <TableFeed events={events} onDelete={onDelete}/>
            </div>
            {
                events.length === 0 && <NoEventsBlurb />
            }
        </>
    );
};

export default UserEventsPage;