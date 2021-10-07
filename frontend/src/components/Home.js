// IMPORT DEPENDENCIES
import React, { useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

// IMPORT COMPONENTS
import GoogleMapWithMarker from "./GoogleMap/GoogleMapWithMarker";
import Menu from "./Menu";
import ButtonCategory from "./ButtonCategory";
import SearchBar from "./SearchBar";

//IMPORT LOADING
import { Loading } from "./Loading";

const Home = () => {
    const [hosts, setHosts] = useState([]);
    const [hostsLoaded, setHostsLoaded] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState(null);
    const [searchValue, setSearchValue] = useState("");

    const history = useHistory();

    useEffect(() => {
        fetch("/hosts")
            .then((res) => res.json())
            .then((data) => {
                setHosts(data.data);
                setHostsLoaded(true);
            });
    }, []);

    const menuItems = useMemo(() => {
        // No filter selected so return everything
        if (!selectedFilter && !searchValue) {
            return hosts;
        }

        let filteredHosts = hosts;

        // If a filter has been selected
        if (selectedFilter) {
            filteredHosts = hosts.filter(
                (host) => host.category === selectedFilter
            );
        }

        // If a search value has been entered
        if (searchValue) {
            filteredHosts = filteredHosts.filter((host) =>
                host.name.toLowerCase().includes(searchValue.toLowerCase())
            );
        }

        return filteredHosts;
    }, [hosts, selectedFilter, searchValue]);

    const handleFilterChange = (filter) => {
        setSelectedFilter(filter);
    };

    const handleOnMarkerClick = (host) => {
        history.push(`/host/${host._id}`);
    };

    if (!hostsLoaded) {
        return <Loading />;
    }

    return (
        <Wrapper>
            <FilterWrapper>
                <ButtonCategory
                    selectedFilter={selectedFilter}
                    setFilter={handleFilterChange}
                />
                <SearchBar
                    setSearchValue={(value) => setSearchValue(value)}
                    searchValue={searchValue}
                />
            </FilterWrapper>
            <Menu menuItem={menuItems} />
            <GoogleMapWithMarker
                hosts={hosts}
                onMarkerClick={handleOnMarkerClick}
            />
        </Wrapper>
    );
};

export default Home;

const Wrapper = styled.div`
    padding: var(--padding-page);
`;

const FilterWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
