import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [currentUserLoaded, setCurrentUserLoaded] = useState(false);

    useEffect(() => {
        fetch("/me")
            .then((res) => res.json())
            .then((data) => {
                if (data.data) {
                    setCurrentUser(data.data);
                }
                setCurrentUserLoaded(true);
            });
    }, []);

    return (
        <AuthContext.Provider
            value={{ currentUser, currentUserLoaded, setCurrentUser }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
