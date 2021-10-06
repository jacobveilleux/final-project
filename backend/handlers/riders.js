const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const dbname = "RIDE";

// GET host by email
const getRidersByEmail = async (req, res) => {
    const { email } = req.params;
    const client = await new MongoClient(MONGO_URI, options);

    // connect
    await client.connect();

    // declare db
    const db = client.db(dbname);

    // look inside collection "riders"
    const users = await db.collection("users").find().toArray();

    const filterUsersByEmail = users.filter((user) => {
        return user.email == email;
    });

    if (filterUsersByEmail[0]) {
        res.status(200).json({ status: 200, data: filterUsersByEmail[0] });
    } else {
        res.status(404).json({ status: 404, message: "rider not found" });
    }
    // Close
    client.close();
};

module.exports = { getRidersByEmail };
