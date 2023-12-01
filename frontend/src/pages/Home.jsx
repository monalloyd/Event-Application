import { useEffect, useState } from "react";
import { fetchAllEvents, refreshToken } from "../api/api";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import LogoutButton from "../components/LogoutButton";
import Feed from "../components/Feed";

const Home = () => {
    const { token, roles, setAuthData } = useAuth();
    const [ events, setEvents ] = useState([]);
    const [ searchParams, setSearchParams ] = useSearchParams({ page: 0, size: 2 });
    const [ isLastPage, setIsLastPage ] = useState(false);
    const [ isFirstPage, setIsFirstPage ] = useState(true);

    useEffect(() => {
        fetchAllEvents(searchParams, token)
        .then(res => res.json())
        .then((data) => {
            setEvents(data.content);
            setSearchParams({ page: data.number, size: data.size });
            setIsFirstPage(data.first);
            setIsLastPage(data.last);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
    }, [searchParams]);

    const fetchNextPage = () => {
        const newPage = searchParams.get("page") + 1;
        setSearchParams({ page: newPage, size });
    }

    const fetchPrevPage = () => {
        const newPage = searchParams.get("page") - 1;
        setSearchParams({ page: newPage, size });
    }

    const changeSize = (num) => {
        const int = parseInt(num);
        const newPage = searchParams.get("page");
        setSearchParams({page: newPage, size: int});
    }

    const refreshAuthToken = () => {
        refreshToken(token)
        .then(res => res.text())
        .then((response) => {
            console.log(response);
            setAuthData(response, roles);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
    }

    return (
        <>
            <button onClick={() => refreshAuthToken()}>Refresh Token</button>
            <LogoutButton />
            <select onChange={(e) => changeSize(e.target.value)} name="size">
                <option value="2">Show 2 Events</option>
                <option value="5">Show 5 Events</option>
                <option value="10">Show 10 Events</option>
                <option value="20">Show 20 Events</option>
            </select>
            <Feed events={events}/>
            {
                !isFirstPage && <button onClick={fetchPrevPage}>prev</button>
            }
            {
                !isLastPage && <button onClick={fetchNextPage}>next</button>
            }
        </>
    );
};

export default Home;