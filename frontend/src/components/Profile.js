// IMPORT DEPENDENCIES
import React from "react";
import styled from "styled-components";

// IMPORT COMPONENTS

const Profile = () => {
    return (
        <Wrapper>
            <div>
                <Container>
                    <div>
                        <Image src="https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" />
                    </div>
                    <div>
                        <Name>Test Profile</Name>
                        <City>Montréal</City>
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
