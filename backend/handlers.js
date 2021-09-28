const { MongoClient } = require("mongodb");
const { owners, riders } = require("./data");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const dbname = "finalproject";

// GET all owners
const getOwners = async (req, res) => {
    const client = await new MongoClient(MONGO_URI, options);

    // connect
    await client.connect();

    // declare db
    const db = client.db(dbname);

    // look inside collection "owners"
    const owners = await db.collection("owners").find().toArray();

    // status
    owners
        ? res.status(200).json({ status: 200, data: owners })
        : res.status(404).json({ status: 404, data: "owners not found" });
};

module.exports = { getOwners };
