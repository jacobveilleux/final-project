import React from "react";
import styled from "styled-components";

const SearchBar = ({ searchValue, setSearchValue }) => {
    return (
        <Wrapper>
            <input
                type="text"
                placeholder="Search"
                value={searchValue}
                onChange={(ev) => {
                    setSearchValue(ev.target.value);
                }}
            ></input>
            {/* {users
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
                })} */}
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
