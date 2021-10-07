import React, { useState } from "react";
import styled from "styled-components";

const SearchBar = ({ users }) => {
    const [searchTerm, setSearchTerm] = useState("");
    return (
        <Wrapper>
            <input
                type="text"
                placeholder="Search"
                onChange={(ev) => {
                    console.log(ev.target.value);
                    setSearchTerm(ev.target.value);
                }}
            ></input>
            {users
                .filter((val) => {
                    if (searchTerm === "") {
                        return val;
                    } else if (
                        val.name
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                    ) {
                        return val;
                    }
                })
                .map((user, index) => {
                    return (
                        <div key={index}>
                            {user.name}
                            {user.surname}
                        </div>
                    );
                })}
        </Wrapper>
    );
};

export default SearchBar;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;
