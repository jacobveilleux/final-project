import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const RidePage = () => {
    const { _id } = useParams();
    const [user, setUser] = useState([]);

    useEffect(() => {
        fetch(`/host/id/${_id}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data.data[0]);
                setUser(data.data[0]);
            });
    }, [_id]);

    return (
        <Wrapper>
            <Image
                src={`data:image/jpeg;base64,${user.imageSrc}`}
                width={100}
                alt="ride"
            />
            <Name>
                <div>{user.firstName}</div>
                <div>{user.lastName}</div>
            </Name>
            <div>{user.category}</div>
            <div>{user.price} $ per day</div>
            <Description>{user.description}</Description>
            <Button type="submit">Book</Button>
        </Wrapper>
    );
};

export default RidePage;

const Wrapper = styled.div`
    padding: var(--padding-page);
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Image = styled.img`
    height: 250px;
    width: 250px;
`;

const Name = styled.div``;

const Description = styled.div``;

const Button = styled.button``;
