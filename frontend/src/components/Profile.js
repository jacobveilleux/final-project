// IMPORT DEPENDENCIES
import React from "react";
import styled from "styled-components";

// IMPORT COMPONENTS

const Profile = () => {
    return (
        <Wrapper>
            <div>
                <Container>
                    <div></div>
                    <div>
                        <Name>Jacob</Name>
                        <City>Montreal</City>
                    </div>
                    <div></div>
                </Container>
            </div>
        </Wrapper>
    );
};

export default Profile;

const Wrapper = styled.div`
    padding: var(--padding-page);
`;

const Container = styled.div`
    display: flex;
`;

// const Image = styled.img`
//     width: 160px;
//     height: 160px;
//     border-radius: 80px;
// `;

const Name = styled.div`
    margin: 10px 0px 0px 50px;
    font-size: 22px;
`;

const City = styled.div`
    margin: 10px 0px 0px 50px;
    font-size: 18px;
    font-style: italic;
`;
