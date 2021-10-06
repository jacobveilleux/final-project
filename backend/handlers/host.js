const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const dbname = "RIDE";

// GET all host
const getHost = async (req, res) => {
    const client = await new MongoClient(MONGO_URI, options);

    try {
        // connect
        await client.connect();

        // declare db
        const db = client.db(dbname);

        // look inside collection "host"
        const users = await db.collection("host").find().toArray();

        // status
        users
            ? res.status(200).json({ status: 200, data: users })
            : res.status(404).json({ status: 404, message: "host not found" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, message: "something went wrong" });
    }

    // Close
    client.close();
};

// GET host by ID
const getHostById = async (req, res) => {
    const { _id } = req.params;
    const client = await new MongoClient(MONGO_URI, options);

    // connect
    await client.connect();

    // declare db
    const db = client.db(dbname);

    // look inside collection "host"
    const users = await db.collection("host").find().toArray();

    const filterUsersById = users.filter((user) => {
        return user._id == _id;
    });

    if (filterUsersById[0]) {
        res.status(200).json({ status: 200, data: filterUsersById });
    } else {
        res.status(404).json({ status: 404, message: "host not found" });
    }
    // Close
    client.close();
};

// GET host by email
const getHostByEmail = async (req, res) => {
    const { email } = req.params;
    const client = await new MongoClient(MONGO_URI, options);

    // connect
    await client.connect();

    // declare db
    const db = client.db(dbname);

    // look inside collection "host"
    const users = await db.collection("host").find().toArray();

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

// POST new host
const addNewHost = async (req, res) => {
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
            email: req.body.email,
            password: req.body.password,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            category: req.body.category,
            imageSrc: req.body.imageSrc,
            price: req.body.price,
            description: req.body.description,
        };

        // POST inside collection "host"
        await db.collection("host").insertOne(data);

        res.status(200).json({
            status: 200,
            data: data,
            message: "host added successfully",
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, message: "something went wrong" });
    }
    // Close
    client.close();
};

module.exports = { getHost, getHostById, getHostByEmail, addNewHost };
