import React, { useContext, useState } from "react";
import styled from "styled-components";
import UserContext from "../context/UserContext";

const SearchBar = () => {
    const { users } = useContext(UserContext);
    const [searchTerm, setSearchTerm] = useState("");
    return (
        <Wrapper>
            <input
                type="text"
                placeholder="Search"
                onChange={(event) => {
                    setSearchTerm(event.target.value);
                }}
            ></input>
            {users
                .filter((val) => {
                    if (searchTerm === "") {
                        return val;
                    } else if (
                        val.firstName
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                    ) {
                        return val;
                    }
                })
                .map((user) => {
                    return (
                        <div>
                            {user.firstName}
                            {user.lastName}
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
