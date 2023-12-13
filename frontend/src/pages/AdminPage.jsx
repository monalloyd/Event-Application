import { useEffect, useState } from "react";
import { fetchAllUsers, deleteUser } from "../api/api";
import { useAuth } from "../provider/AuthProvider";
import UserFeed from "../components/UserFeed";

const AdminPage = () => {
    const { token } = useAuth();
    const [ users, setUsers ] = useState([]);
    const [ fetchToggl, setFetchToggl ] = useState(false);

    useEffect(() => {
        fetchAllUsers(token)
        .then(res => res.json())
        .then((data) => {
            setUsers(data);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
    }, [fetchToggl])

    const onDelete = (id) => {
        deleteUser(id, token)
        .then(() => {
            fetchToggl ? setFetchToggl(false) : setFetchToggl(true);
        })
        .catch(err => console.log("Error deleteing data: " + err));
    }

    return (
        <>
            <UserFeed users={users} onDelete={onDelete}/>
        </>
    )
};

export default AdminPage;