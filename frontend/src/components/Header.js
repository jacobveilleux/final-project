// IMPORT DEPENDENCIES
import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

// IMPORT COMPONENTS

const Header = () => {
    return (
        <>
            <Wrapper>
                <Link>
                    <Logo>
                        <StyledLogo exact to="/">
                            RIDE
                        </StyledLogo>
                    </Logo>
                    <StyledNavLink exact to="/list-your-ride">
                        Become a host
                    </StyledNavLink>
                    <StyledNavLink exact to="/profile">
                        Profile
                    </StyledNavLink>
                    <StyledNavLink exact to="/login">
                        Log in
                    </StyledNavLink>
                    <StyledNavLink exact to="/signup">
                        Sign up
                    </StyledNavLink>
                </Link>
            </Wrapper>
        </>
    );
};

export default Header;

const Wrapper = styled.div`
    padding: var(--padding-page);
    box-shadow: 0 2px 5px rgba(67, 72, 76, 0.3);
`;

const Link = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Logo = styled.div`
    margin-right: 45vw;
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
`;
