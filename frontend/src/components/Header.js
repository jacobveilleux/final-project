// IMPORT DEPENDENCIES
import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

// IMPORT COMPONENTS
import LoginButton from "./Login/LoginButton";
import LogoutButton from "./Login/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
    const { isAuthenticated } = useAuth0();
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
                        <StyledNavLink exact to="/list-your-ride">
                            Become a host
                        </StyledNavLink>
                        {isAuthenticated ? (
                            <StyledNavLink exact to="/profile">
                                Profile
                            </StyledNavLink>
                        ) : null}
                        <StyledNavLink exact to="/login">
                            {isAuthenticated ? (
                                <LogoutButton />
                            ) : (
                                <LoginButton />
                            )}
                        </StyledNavLink>
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
