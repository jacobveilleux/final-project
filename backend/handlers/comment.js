const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const dbname = "RIDE";

const createCommentForHost = async (req, res) => {
    const client = await new MongoClient(MONGO_URI, options);

    try {
        // connect
        await client.connect();

        // declare db
        const db = client.db(dbname);

        const currentUser = await db
            .collection("users")
            .findOne({ _id: req.session.userId });

        await db.collection("users").updateOne(
            { _id: req.params.hostId },
            {
                $push: {
                    comments: {
                        createdAt: new Date(),
                        author: currentUser,
                        text: req.body.text,
                    },
                },
            }
        );

        res.status(200).json({ status: 200 });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, message: "something went wrong" });
    }

    // Close
    client.close();
};

const getCommentsForHost = async (req, res) => {
    const client = await new MongoClient(MONGO_URI, options);

    try {
        // connect
        await client.connect();

        // declare db
        const db = client.db(dbname);

        // look inside collection "host"
        const user = await db
            .collection("users")
            .find({ _id: req.params.hostId });

        res.status(200);
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, message: "something went wrong" });
    }

    // Close
    client.close();
};

module.exports = { getCommentsForHost, createCommentForHost };
