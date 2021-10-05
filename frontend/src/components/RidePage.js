import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const RidePage = () => {
    const { _id } = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`/user/ride/${_id}`)
            .then((res) => res.json())
            .then((data) => {
                setData(data.data);
            });
    }, [_id]);

    return (
        <Wrapper>
            <Image
                src={`data:image/jpeg;base64,${data.imageSrc}`}
                width={100}
                alt="ride"
            ></Image>
        </Wrapper>
    );
};

export default RidePage;

const Wrapper = styled.div`
    padding: var(--padding-page);
    display: flex;
    justify-content: center;
`;

const Image = styled.img`
    height: 250px;
    width: 250px;
`;
