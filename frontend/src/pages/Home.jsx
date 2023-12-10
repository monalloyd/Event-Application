import { useEffect, useState } from "react";
import { fetchEvents, refreshToken } from "../api/api";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import LogoutButton from "../components/LogoutButton";
import Feed from "../components/Feed";
import Filter from "../components/Filter";

const Home = () => {
    const { token, roles, setAuthData } = useAuth();
    const [ events, setEvents ] = useState([]);
    const [ searchParams, setSearchParams ] = useSearchParams();
    const [ isLastPage, setIsLastPage ] = useState(false);
    const [ isFirstPage, setIsFirstPage ] = useState(true);
    const [ showFilter, setShowFilter ] = useState(false);

    useEffect(() => {
        fetchEvents(searchParams, token)
        .then(res => res.json())
        .then((data) => {
            setEvents(data.content);
            setIsFirstPage(data.first);
            setIsLastPage(data.last);

            searchParams.set("page", data.number);
            searchParams.set("size", data.size);
            const newSearchParams = searchParams.getAll();
            
            setSearchParams(newSearchParams);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
    }, [searchParams]);

    const fetchNextPage = () => {
        const newPage = parseInt(searchParams.get("page") + 1);
        const size = searchParams.get("size");
        searchParams.delete("page");
        setSearchParams({ ...searchParams, page: newPage, size });
    }

    const fetchPrevPage = () => {
        const newPage = parseInt(searchParams.get("page") - 1);
        const size = searchParams.get("size");
        searchParams.delete("page");
        setSearchParams({ ...searchParams, page: newPage, size });
    }

    const changeSize = (num) => {
        setSearchParams({ ...searchParams, size: num });
    }

    const applyFilters = (filters) => {
        const newFilters = {};
        newFilters.page = 0;
        newFilters.size = searchParams.get("size");

        if(filters.eventType.length >= 1) {
            newFilters.eventType = filters.eventType;
        }
        if(filters.start.length >= 1) {
            newFilters.start = filters.start;
        }
        if(filters.end.length >= 1) {
            newFilters.end = filters.end;
        }
        if(filters.venue.length >= 1) {
            newFilters.venue = filters.venue;
        }
        if(filters.street.length >= 1) {
            newFilters.street = filters.street;
        }
        if(filters.zipcode.length >= 1) {
            newFilters.zipcode = filters.zipcode;
        }
        if(filters.city.length >= 1) {
            newFilters.city = filters.city;
        }
        if(filters.state.length >= 1) {
            newFilters.state = filters.state;
        }
        if(filters.country.length >= 1) {
            newFilters.country = filters.country;
        }
        setSearchParams(newFilters);
    }

    const refreshAuthToken = () => {
        refreshToken(token)
        .then(res => res.text())
        .then((response) => {
            setAuthData(response, roles);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
    }

    const toggleFilter = (e) => {
        showFilter ? setShowFilter(false) : setShowFilter(true);
        e.target.blur();
    }

    const clearFilters = () => {
        const size = searchParams.get("size");
        setSearchParams({ size });
    }

    return (
        <>
            <div>
                <button onClick={() => refreshAuthToken()}>Temp Refresh Token Button</button>
            </div>
            <div>
                <LogoutButton />
            </div>
            <div>
                <button onClick={(e) => toggleFilter(e)}>Filter</button>
            </div>
            {
                showFilter && <Filter setShowFilter={setShowFilter} applyFilters={applyFilters} />
            }
            <div>
            {
                searchParams.size > 2 && <button onClick={() => clearFilters()}>Clear Filters</button>
            }
            </div>
            <div>
                <select onChange={(e) => changeSize(e.target.value)} name="size">
                    <option value="default">Number of displayed events</option>
                    <option value="2">Show 2 Events</option>
                    <option value="5">Show 5 Events</option>
                    <option value="10">Show 10 Events</option>
                    <option value="20">Show 20 Events</option>
                </select>
            </div>
            <div>
                <Feed events={events}/>
            </div>
            <div>
                {
                    !isFirstPage && <button onClick={fetchPrevPage}>prev</button>
                }
                {
                    !isLastPage && <button onClick={fetchNextPage}>next</button>
                }
            </div>
        </>
    );
};

export default Home;