const { MongoClient } = require("mongodb");

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

    try {
        // connect
        await client.connect();

        // declare db
        const db = client.db(dbname);

        // look inside collection "owners"
        const owners = await db.collection("owners").find().toArray();

        // status
        owners
            ? res.status(200).json({ status: 200, data: owners })
            : res
                  .status(404)
                  .json({ status: 404, message: "owners not found" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, message: "something smell funny" });
    }
};

// GET all riders
const getRiders = async (req, res) => {
    const client = await new MongoClient(MONGO_URI, options);

    try {
        // connect
        await client.connect();

        // declare db
        const db = client.db(dbname);

        // look inside collection "owners"
        const riders = await db.collection("riders").find().toArray();

        // status
        riders
            ? res.status(200).json({ status: 200, data: riders })
            : res
                  .status(404)
                  .json({ status: 404, message: "riders not found" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, message: "something smell funny" });
    }
};

module.exports = { getOwners, getRiders };
