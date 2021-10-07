const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

require("dotenv").config();

const { MONGO_URI } = process.env;

const dbname = "RIDE";

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const logout = async (req, res) => {
    req.session.destroy();
    res.status(200).json({ status: 200, message: `Logout successful` });
};

const login = async (req, res) => {
    const client = await new MongoClient(MONGO_URI, options);

    try {
        // connect
        await client.connect();

        // declare db
        const db = client.db(dbname);

        const user = await db
            .collection("users")
            .findOne({ email: req.body.email });

        if (!user) {
            return res.status(401).json({
                status: 401,
                message: `Can't find anyone with email ${req.body.email}`,
            });
        }

        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!validPassword) {
            return res.status(401).json({
                status: 401,
                message: `Invalid password`,
            });
        }

        req.session.userId = user._id;

        return res.status(200).json({ message: "success", data: user });
    } catch (error) {
        console.log(err);
        res.status(500).json({ status: 500, message: "something went wrong" });
    }

    // Close
    client.close();
};

const getCurrentUser = async (req, res) => {
    const client = await new MongoClient(MONGO_URI, options);

    try {
        await client.connect();
        const db = client.db(dbname);

        const user = await db
            .collection("users")
            .findOne({ _id: req.session.userId });

        return res.status(200).json({
            status: 200,
            data: user,
        });
    } catch (error) {
        console.log(err);
        res.status(500).json({ status: 500, message: "something went wrong" });
    }

    // Close
    client.close();
};

const registerHost = async (req, res) => {
    const client = await new MongoClient(MONGO_URI, options);

    try {
        // connect
        await client.connect();
        // declare db
        const db = client.db(dbname);

        const encryptedPassword = await bcrypt.hash(req.body.password, 10);

        const userId = uuidv4();

        const data = {
            _id: userId,
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            password: encryptedPassword,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            category: req.body.category,
            imageSrc: req.body.imageSrc,
            price: req.body.price,
            description: req.body.description,
            role: "HOST",
        };

        const existingUser = await db
            .collection("users")
            .findOne({ email: `${req.body.email}` });

        if (existingUser === null) {
            await db.collection("users").insertOne(data);
            req.session.userId = userId;
            res.status(200).json({
                status: 200,
                data: data,
                message: "host added successfully",
            });
        } else {
            res.status(400).json({
                status: 400,
                message: "email already taken",
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, message: "something went wrong" });
    }
    // Close
    client.close();
};

const registerRider = async (req, res) => {
    const client = await new MongoClient(MONGO_URI, options);

    try {
        // connect
        await client.connect();

        // declare db
        const db = client.db(dbname);

        console.log("req.body", req.body);

        const encryptedPassword = await bcrypt.hash(req.body.password, 10);
        const userId = uuidv4();

        const data = {
            _id: userId,
            name: req.body.name,
            surname: req.body.surname,
            city: req.body.city,
            state: req.body.state,
            email: req.body.email,
            password: encryptedPassword,
            role: "RIDER",
        };

        const existingUser = await db
            .collection("users")
            .findOne({ email: `${req.body.email}` });

        if (existingUser === null) {
            await db.collection("users").insertOne(data);
            req.session.userId = userId;
            res.status(200).json({
                status: 200,
                message: "rider added successfully",
            });
        } else {
            res.status(400).json({
                status: 400,
                message: "email already taken",
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, message: "something went wrong" });
    }
    // Close
    client.close();
};

module.exports = { getCurrentUser, login, logout, registerHost, registerRider };
