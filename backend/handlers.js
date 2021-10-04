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
        res.status(500).json({ status: 500, message: "something went wrong" });
    }
};

// GET user by email
const getUserByEmail = async (req, res) => {
    const { email } = req.params;
    const client = await new MongoClient(MONGO_URI, options);

    try {
        // connect
        await client.connect();

        // declare db
        const db = client.db(dbname);

        // look inside collection "owners"
        const users = await db.collection("users").find().toArray();

        const filterUsersByEmail = users.filter((user) => {
            return user.email == email;
        });

        if (filterUsersByEmail) {
            res.status(200).json({ status: 200, data: filterUsersByEmail[0] });
        } else {
            res.status(404).json({ status: 404, message: "company not found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, message: "something went wrong" });
    }
};

// PUT update user by email
const updateUserByEmail = async (req, res) => {
    const { email } = req.params;
    const client = await new MongoClient(MONGO_URI, options);

    try {
        // connect
        await client.connect();

        // declare db
        const db = client.db(dbname);

        const query = { email };
        const newValues = {
            $set: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                city: req.body.city,
                address: req.body.address,
                state: req.body.state,
                host: req.body.host,
                category: req.body.category,
                imageSrc: req.body.imageSrc,
                price: req.body.price,
                description: req.body.description,
            },
        };

        const users = await db.collection("users").updateOne(query, newValues);

        users
            ? res
                  .status(200)
                  .json({ status: 200, message: "user updated successfully" })
            : res.status(404).json({ status: 200, message: "user not found" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, message: "something went wrong" });
    }
};

module.exports = { getUsers, getUserByEmail, updateUserByEmail };
