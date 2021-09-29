// IMPORT DEPENDENCIES
import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import {
    FaFacebook,
    FaInstagram,
    FaTwitter,
    FaRegCopyright,
} from "react-icons/fa";

// IMPORT COMPONENTS

const Footer = () => {
    return (
        <Wrapper>
            <ul>
                <li>
                    <Menu exact to="/">
                        Home
                    </Menu>
                </li>
                <li>
                    <Menu to="/list-your-ride">Become a host</Menu>
                </li>
                <li>
                    <Menu to="/profile">Profile</Menu>
                </li>
            </ul>
            <ul
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <div style={{ display: "flex", marginBottom: "20px" }}>
                    <li>
                        <SocialTag href="https://www.facebook.com/">
                            <FaFacebook />
                        </SocialTag>
                    </li>
                    <li>
                        <SocialTag href="https://www.instagram.com/">
                            <FaInstagram />
                        </SocialTag>
                    </li>
                    <li>
                        <SocialTag href="https://twitter.com/?lang=en">
                            <FaTwitter />
                        </SocialTag>
                    </li>
                </div>
                <span style={{ textAlign: "center" }}>
                    <FaRegCopyright /> RIDE
                </span>
            </ul>
            <ul>
                <li>
                    <Menu to="/about">About</Menu>
                </li>
                <li>
                    <Menu to="/contact-us">Contact Us</Menu>
                </li>
            </ul>
        </Wrapper>
    );
};

export default Footer;

const Wrapper = styled.div`
    background-color: var(--color-2);
    display: flex;
    justify-content: space-between;
    padding: var(--padding-page);

    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;

    li {
        margin-top: 10px;
    }
`;

const Menu = styled(NavLink)`
    text-decoration: none;
    font-size: 20px;
`;

const SocialTag = styled.a`
    text-decoration: none;
    font-size: 20px;
    padding: 10px;
`;
