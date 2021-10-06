import React, { createContext, useEffect, useState } from "react";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        fetch("/host")
            .then((res) => res.json())
            .then((data) => {
                setUsers(data.data);
                setLoaded(true);
            });
    }, []);

    return (
        <UserContext.Provider value={{ users, loaded }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
