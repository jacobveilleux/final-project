import React, { useContext } from "react";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} from "react-google-maps";

import UserContext from "../../context/UserContext";

const MapWithAMarker = () => {
    const { users } = useContext(UserContext);
    return (
        <GoogleMap
            defaultZoom={11}
            defaultCenter={{ lat: 45.508888, lng: -73.561668 }}
        >
            {users.map((user, index) => {
                if (user.host === true) {
                    return (
                        <Marker
                            key={index}
                            position={{ lat: +user.lat, lng: +user.lng }}
                        />
                    );
                }
                return user;
            })}
        </GoogleMap>
    );
};

const WrappedMap = withScriptjs(withGoogleMap(MapWithAMarker));

const Map = () => {
    return (
        <WrappedMap
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_GEO_API_KEY}`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
        />
    );
};

export default Map;
