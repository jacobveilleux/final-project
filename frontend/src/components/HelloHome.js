import React from "react";
import styled from "styled-components";

// IMPORT COMPONENTS
import homeImage from "./assets/homeImage.jpg";

const HelloHome = () => {
    return (
        <Wrapper>
            <Text></Text>
        </Wrapper>
    );
};

export default HelloHome;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url(${homeImage});
    background-size: cover;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
`;

const Text = styled.img``;
