const { MongoClient } = require("mongodb");
const { host, riders } = require("./data");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const dbname = "RIDE";

const batchImport = async () => {
    const client = await new MongoClient(MONGO_URI, options);

    try {
        // connect
        await client.connect();
        console.log("connected!");

        // declare db
        const db = client.db(dbname);

        // creating new collection "owners"
        await db.collection("host").insertMany(host);

        // creating new collection "riders"
        await db.collection("riders").insertMany(riders);
    } catch (err) {
        console.log("failed!");
        console.log(err);
    }

    // close
    client.close();
    console.log("disconnect!");
};

batchImport();
