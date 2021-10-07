// IMPORT DEPENDENCIES
import React, { useContext } from "react";
import styled from "styled-components";
import { NavLink, useHistory } from "react-router-dom";

// IMPORT COMPONENTS
import AuthContext from "./context/AuthContext";

const Header = () => {
    const { currentUser, setCurrentUser } = useContext(AuthContext);
    const history = useHistory();

    function logout() {
        fetch("/logout", {
            method: "POST",
        })
            .then((res) => res.json())
            .then((data) => {
                setCurrentUser(null);
                history.push("/");
            });
    }

    return (
        <>
            <Wrapper>
                <Nav1>
                    <Logo>
                        <StyledLogo exact to="/">
                            RIDE
                        </StyledLogo>
                    </Logo>
                    <Nav2>
                        {currentUser ? (
                            <>
                                <StyledNavLink to="/profile">
                                    Profile
                                </StyledNavLink>
                                <StyledNavLink onClick={() => logout()} to="/">
                                    Logout
                                </StyledNavLink>
                            </>
                        ) : (
                            <>
                                <StyledNavLink exact to="/hostRegistration">
                                    Become a host
                                </StyledNavLink>
                                <StyledNavLink exact to="/riderRegistration">
                                    Become a rider
                                </StyledNavLink>
                                <StyledNavLink exact to="/login">
                                    Log In
                                </StyledNavLink>
                            </>
                        )}
                    </Nav2>
                </Nav1>
            </Wrapper>
        </>
    );
};

export default Header;

const Wrapper = styled.div`
    padding: var(--padding-page);
    box-shadow: 0 2px 5px rgba(67, 72, 76, 0.3);
`;

const Nav1 = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Nav2 = styled.div`
    display: flex;
`;

const Logo = styled.div`
    font-weight: bold;
    border: 2px solid;
    border-radius: 5px;
    padding: 5px;
`;

const StyledLogo = styled(NavLink)`
    text-decoration: none;
    font-size: 24px;
`;

const StyledNavLink = styled(NavLink)`
    text-decoration: none;
    font-size: 16px;
    display: flex;
    align-items: center;
    margin-left: 60px;
`;
