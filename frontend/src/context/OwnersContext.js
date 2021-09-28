import React, { createContext, useReducer } from "react";

export const OwnersContext = createContext();

const initialState = {
    isLoaded: false,
    RV: null,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "GET-RV-BY-CATEGORY": {
            return {
                ...state,
                isLoaded: true,
                RV: action.data,
            };
        }
        default:
            throw new Error(`Unrecognized action: ${action.type}`);
    }
};

export const OwnersProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const getRVByCategory = (data) => {
        dispatch({
            type: "GET-RV-BY-CATEGORY",
            ...data,
        });
    };

    return (
        <OwnersContext.Provider value={{ state, action: { getRVByCategory } }}>
            {children}
        </OwnersContext.Provider>
    );
};
