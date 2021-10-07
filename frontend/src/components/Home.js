// IMPORT DEPENDENCIES
import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { NavLink } from "react-router-dom";
import { FiLoader } from "react-icons/fi";

// IMPORT COMPONENTS
import GoogleMapWithMarker from "./GoogleMap/GoogleMapWithMarker";
import SearchBar from "./SearchBar";
import Menu from "./Menu";
import ButtonCategory from "./ButtonCategory";

const Home = () => {
    const [hosts, setHosts] = useState([]);
    const [hostsLoaded, setHostsLoaded] = useState(false);
    const [menuItem, setMenuItem] = useState(hosts);

    useEffect(() => {
        fetch("/hosts")
            .then((res) => res.json())
            .then((data) => {
                setHosts(data.data);
                setHostsLoaded(true);
            });
    }, []);

    const filter = (button) => {
        const filteredData = hosts.filter((host) => host.category === button);
        setMenuItem(filteredData);
    };

    if (!hostsLoaded) {
        return <Loading />;
    }

    return (
        <Wrapper>
            <SearchBar users={hosts} />
            <ButtonCategory filter={filter} />
            <Menu menuItem={menuItem} />
            <GoogleMapWithMarker hosts={hosts} />
        </Wrapper>
    );
};

export default Home;

const Wrapper = styled.div`
    padding: var(--padding-page);
`;

const spin = keyframes`
  from {transform:rotate(0deg)};
    to {transform:rotate(360deg)};
`;

const Loading = styled(FiLoader)`
    position: absolute;
    left: 50%;
    top: 50%;
    width: 30px;
    height: 30px;
    animation: ${spin} 1500ms linear infinite;
    color: var(--primary-color);
`;
