import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllUsers, deleteUser } from "../api/api";
import { useAuth } from "../provider/AuthProvider";
import UserFeed from "../components/UserFeed";

const AdminPage = () => {
    const { token, setAuthData } = useAuth();
    const navigate = useNavigate();
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
            if(!localStorage.getItem("token") || localStorage.getItem("token") == "") {
                setAuthData();
                localStorage.removeItem("roles");
                localStorage.removeItem("token");
                navigate("/", { replace: true });
            }
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