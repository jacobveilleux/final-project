// IMPORT DEPENDENCIES
import React, { useContext } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

// IMPORT COMPONENTS
import UserContext from "./context/UserContext";
import GoogleMapWithMarker from "./GoogleMap/GoogleMapWithMarker";

// import SearchBar from "./SearchBar";

const Home = () => {
    const { users } = useContext(UserContext);

    return (
        <Wrapper>
            <Container>
                {users.map((user, index) => {
                    return (
                        <StyledLink to={`/host/id/${user._id}`} key={index}>
                            <Image
                                src={`data:image/jpeg;base64,${user.imageSrc}`}
                                width={100}
                                alt="ride"
                            />

                            <Name>
                                <div>{user.firstName}</div>
                                <div>{user.lastName}</div>
                            </Name>
                            <div>{user.category}</div>
                            <div>{user.price} $ per day</div>
                        </StyledLink>
                    );
                })}
            </Container>
        </Wrapper>
    );
};

export default Home;

const Wrapper = styled.div`
    padding: var(--padding-page);

    div {
        display: flex;
        justify-content: center;
    }
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
