"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const {
    getUsers,
    getUserById,
    getUserByEmail,
    updateUserByEmail,
} = require("./handlers");

express()
    // chain express methods for convenience
    .use(morgan("tiny"))
    .use(express.json())
    // Any requests for static files will go into the public folder
    .use(express.static("public"))

    //ENDPOINTS
    // ---------------------------------
    .get("/users", getUsers)
    .get("/user/ride/:_id", getUserById)
    .get("/user/:email", getUserByEmail)
    .put("/user/update/:email", updateUserByEmail)
    // ---------------------------------

    // this catch all endpoint.
    .get("*", (req, res) => {
        res.status(404).json({
            status: 404,
            message: "This is obviously not what you are looking for.",
        });
    })

    // Node spins up server and sets it to listen on port 8000.
    .listen(8000, () => console.log(`Listening on port 8000`));
