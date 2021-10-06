"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const session = require("express-session");

const { getHosts, getHostById, getHostByEmail } = require("./handlers/host");
const { getRidersByEmail } = require("./handlers/riders");
const { isAuth } = require("./middlewares/auth");
const {
    getCurrentUser,
    logout,
    login,
    registerHost,
    registerRider,
} = require("./handlers/auth");

express()
    // chain express methods for convenience
    .use(morgan("tiny"))
    .use(express.json())
    // Any requests for static files will go into the public folder
    .use(express.static("public"))
    .use(
        session({
            secret: process.env.APP_SECRET,
            resave: true,
            saveUninitialized: true,
        })
    )

    //ENDPOINTS
    // ---------------------------------
    // CURRENT USER
    .get("/me", isAuth, getCurrentUser)

    // AUTH
    .post("/login", login)
    .post("/logout", logout)
    .post("/registerHost", registerHost)
    .post("/registerRider", registerRider)

    // HOST
    .get("/hosts", isAuth, getHosts)
    .get("/host/id/:_id", isAuth, getHostById)
    .get("/host/email/:email", isAuth, getHostByEmail)

    //RIDERS
    .get("/rider/:email", isAuth, getRidersByEmail)
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
