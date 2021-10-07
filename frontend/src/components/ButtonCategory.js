import React from "react";

const ButtonCategory = ({ filter }) => {
    return (
        <div>
            <button type="button" onClick={() => filter("Moto")}>
                Moto
            </button>
            <button type="button" onClick={() => filter("ATV")}>
                ATV
            </button>
            <button type="button" onClick={() => filter("Snowmobile")}>
                Snomobile
            </button>
        </div>
    );
};

export default ButtonCategory;
