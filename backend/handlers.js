const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const dbname = "RIDE";

// GET all users
const getUsers = async (req, res) => {
    const client = await new MongoClient(MONGO_URI, options);

    try {
        // connect
        await client.connect();

        // declare db
        const db = client.db(dbname);

        // look inside collection "owners"
        const users = await db.collection("users").find().toArray();

        // status
        users
            ? res.status(200).json({ status: 200, data: users })
            : res.status(404).json({ status: 404, message: "users not found" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, message: "something smell funny" });
    }
};

// PUT update users
const updateUsers = async (req, res) => {
    const client = await new MongoClient(MONGO_URI, options);

    // connect
    await client.connect();

    // declare db
    const db = client.db(dbname);
};

module.exports = { getUsers };
