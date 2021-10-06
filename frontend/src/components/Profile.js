// IMPORT DEPENDENCIES
import React, { useContext } from "react";
import styled from "styled-components";

// IMPORT COMPONENTS
import AuthContext from "./context/AuthContext";

const Profile = () => {
    const { currentUser } = useContext(AuthContext);

    return (
        <Wrapper>
            <div>
                <Container>
                    <div></div>
                    <div>
                        <Name>{currentUser.name || "NO NAME"}</Name>
                        <City>Montreal</City>
                    </div>

                    <code>
                        <div>CURRENT USER</div>
                        <pre>{JSON.stringify(currentUser, null, 2)}</pre>
                    </code>
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
