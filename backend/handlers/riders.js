const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const dbname = "RIDE";

// POST new rider
const addNewRider = async (req, res) => {
    const client = await new MongoClient(MONGO_URI, options);

    try {
        // connect
        await client.connect();

        // declare db
        const db = client.db(dbname);

        const data = {
            _id: uuidv4(),
            name: req.body.name,
            surname: req.body.surname,
            city: req.body.city,
            state: req.body.state,
            email: req.body.email,
            password: req.nody.password,
        };

        // POST inside collection "riders"
        await db.collection("riders").insertOne(data);

        res.status(200).json({
            status: 200,
            message: "rider added successfully",
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, message: "something went wrong" });
    }
    // Close
    client.close();
};

// GET host by email
const getRidersByEmail = async (req, res) => {
    const { email } = req.params;
    const client = await new MongoClient(MONGO_URI, options);

    // connect
    await client.connect();

    // declare db
    const db = client.db(dbname);

    // look inside collection "riders"
    const users = await db.collection("riders").find().toArray();

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

module.exports = { addNewRider, getRidersByEmail };
