import React from "react";
import styled, { css } from "styled-components";

const Button = styled.button`
    ${(props) =>
        props.selected &&
        css`
            background-color: white;
        `}
`;

const ButtonCategory = ({ setFilter, selectedFilter }) => {
    return (
        <div>
            <Button
                selected={selectedFilter === "Moto"}
                type="button"
                onClick={() => setFilter("Moto")}
            >
                Moto
            </Button>
            <Button
                selected={selectedFilter === "ATV"}
                type="button"
                onClick={() => setFilter("ATV")}
            >
                ATV
            </Button>
            <Button
                selected={selectedFilter === "Snowmobile"}
                type="button"
                onClick={() => setFilter("Snowmobile")}
            >
                Snowmobile
            </Button>
            <Button
                selected={!selectedFilter}
                type="button"
                onClick={() => setFilter("")}
            >
                All
            </Button>
        </div>
    );
};

export default ButtonCategory;
