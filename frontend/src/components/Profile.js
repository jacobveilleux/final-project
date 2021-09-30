// IMPORT DEPENDENCIES
import React from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

// IMPORT COMPONENTS

const Profile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        isAuthenticated && (
            <Wrapper>
                <div>
                    <Container>
                        <div>
                            <Image src={user.picture} />
                        </div>
                        <div>
                            <Name>{user.nickname}</Name>
                            <City>{user.email}</City>
                            <div>{JSON.stringify(user, null, 2)}</div>
                        </div>
                        <div></div>
                    </Container>
                </div>
            </Wrapper>
        )
    );
};

export default Profile;

const Wrapper = styled.div`
    padding: var(--padding-page);
`;

const Container = styled.div`
    display: flex;
`;

const Image = styled.img`
    width: 160px;
    height: 160px;
    border-radius: 80px;
`;

const Name = styled.div`
    margin: 10px 0px 0px 50px;
    font-size: 22px;
`;

const City = styled.div`
    margin: 10px 0px 0px 50px;
    font-size: 18px;
    font-style: italic;
`;
