// IMPORT DEPENDENCIES
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

// IMPORT COMPONENTS
import GoogleMapWithMarker from "./GoogleMap/GoogleMapWithMarker";

// import SearchBar from "./SearchBar";

const Home = () => {
    const [hosts, setHosts] = useState([]);
    const [hostsLoaded, setHostsLoaded] = useState(false);

    useEffect(() => {
        fetch("/hosts")
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setHosts(data.data);
                setHostsLoaded(true);
            });
    }, []);

    if (!hostsLoaded) {
        return <span>Loading</span>;
    }

    return (
        <Wrapper>
            <Container>
                {hosts.map((host, index) => {
                    if (host.role === "RIDER") {
                        return null;
                    }
                    return (
                        <StyledLink to={`/host/id/${host._id}`} key={index}>
                            <Image
                                src={`data:image/jpeg;base64,${host.imageSrc}`}
                                width={100}
                                alt="ride"
                            />

                            <Name>
                                <div>{host.firstName}</div>
                                <div>{host.lastName}</div>
                            </Name>
                            <div>{host.category}</div>
                            <div>{host.price} $ per day</div>
                        </StyledLink>
                    );
                })}
            </Container>
            <GoogleMapWithMarker hosts={hosts} />
        </Wrapper>
    );
};

export default Home;

const Wrapper = styled.div`
    padding: var(--padding-page);
`;

const Container = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    order: 1;
    margin-top: 20px;
    margin-bottom: 20px;
`;

const StyledLink = styled(NavLink)`
    text-decoration: none;
    margin: 40px;
`;

const Image = styled.img`
    height: 250px;
    width: 250px;
`;

const Name = styled.div`
    display: flex;
    font-weight: bold;

    div  {
        margin-right: 5px;
    }
`;
