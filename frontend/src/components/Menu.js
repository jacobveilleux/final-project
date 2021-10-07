import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Menu = ({ menuItem }) => {
    return (
        <Container>
            {menuItem.map((host, index) => {
                if (host.role === "RIDER") {
                    return null;
                }
                return (
                    <StyledLink>
                        <Image
                            src={`data:image/jpeg;base64,${host.imageSrc}`}
                            width={100}
                            alt="ride"
                        />
                        <Price>{host.price}$/day</Price>
                        <FullName>
                            <Name>{host.name}</Name>
                            <Surname>{host.surname}</Surname>
                        </FullName>
                        <Category>{host.category}</Category>
                        <StyledButton to={`/host/id/${host._id}`} key={index}>
                            <Button type="button">More information</Button>
                        </StyledButton>
                    </StyledLink>
                );
            })}
        </Container>
    );
};

export default Menu;

const Container = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    order: 1;
    margin-top: 20px;
    margin-bottom: 20px;
`;

const StyledLink = styled.div`
    margin: 40px;
    border: #43484c solid 2px;
    border-radius: 10px;
    padding: 30px;
`;

const Image = styled.img`
    height: 250px;
    width: 250px;
    border-radius: 10px;
`;

const Price = styled.div`
    margin-top: 10px;
    display: flex;
    justify-content: center;
    font-size: 22px;
`;

const FullName = styled.div`
    display: flex;
    margin-top: 20px;
`;

const Name = styled.div`
    font-weight: bold;
`;

const Surname = styled.div`
    font-weight: bold;
    margin-left: 5px;
`;

const Category = styled.div`
    margin-top: 5px;
    font-style: italic;
`;

const StyledButton = styled(NavLink)`
    text-decoration: none;
    display: flex;
    justify-content: center;
    margin-top: 20px;
`;

const Button = styled.button`
    border: none;
    background-color: var(--color-1);
    color: #fff;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
`;
