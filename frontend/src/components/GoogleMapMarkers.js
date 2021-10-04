// IMPORT DEPENDENCIES
import React, { useContext } from "react";
import { GoogleMap, Marker } from "react-google-maps";

// IMPORT COMPONENTS
import UserContext from "../context/UserContext";

const GoogleMapMarkers = () => {
    const { users } = useContext(UserContext);
    return (
        <GoogleMap
            defaultZoom={8}
            defaultCenter={{ lat: 45.5016889, lng: -73.567256 }}
        >
            {users.map((user) => {
                <Marker position={{ lat: user.lat, lng: user.lng }} />;
            })}
        </GoogleMap>
    );
};

export default GoogleMapMarkers;
