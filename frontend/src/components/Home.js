// IMPORT DEPENDENCIES
import React, { useContext } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

// IMPORT COMPONENTS
import UserContext from "../context/UserContext";
import GoogleMapMarkers from "./GoogleMapMarkers";

const Home = () => {
    const { users } = useContext(UserContext);

    return (
        <Wrapper>
            <div>{/* <GoogleMapMarkers /> */}</div>
            {users.map((user, index) => {
                if (user.host === true) {
                    return (
                        <StyledLink to="/ride" key={index}>
                            <Image
                                src={`data:image/jpeg;base64,${user.imageSrc}`}
                                width={100}
                            ></Image>
                        </StyledLink>
                    );
                }
            })}
        </Wrapper>
    );
};

export default Home;

const Wrapper = styled.div`
    padding: var(--padding-page);
`;

const StyledLink = styled(NavLink)`
    display: flex;
    margin-top: 10px;
`;

const Image = styled.img`
    height: 500px;
    width: 500px;
`;
