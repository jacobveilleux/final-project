// IMPORT DEPENDENCIES
import React, { useContext } from "react";
import styled from "styled-components";
import profileAvatar from "./assets/profileAvatar.jpeg";
// IMPORT COMPONENTS
import AuthContext from "./context/AuthContext";

const Profile = () => {
    const { currentUser } = useContext(AuthContext);

    return (
        <Wrapper>
            <div>
                <Container>
                    <div>
                        <Image src={profileAvatar}></Image>
                    </div>
                    <div>
                        <FullName>
                            <Name>{currentUser.name}</Name>
                            <Surname>{currentUser.surname}</Surname>
                        </FullName>

                        <City>{currentUser.city}</City>
                    </div>
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

const Image = styled.img`
    width: 200px;
    height: 200px;
    border-radius: 80px;
`;

const FullName = styled.div`
    display: flex;
    margin-top: 20px;
`;

const Name = styled.div`
    margin: 10px 0px 0px 50px;
    font-size: 22px;
`;
const Surname = styled.div`
    margin: 10px 0px 0px 50px;
    font-size: 22px;
    margin-left: 5px;
`;

const City = styled.div`
    margin: 10px 0px 0px 50px;
    font-size: 18px;
    font-style: italic;
`;
