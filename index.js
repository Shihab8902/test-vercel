require("dotenv").config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require("express");
const app = express();

const port = process.env.PORT || 5000;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;

app.use(express.json());


const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.kitiq8p.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});




const run = async () => {
    try {
        await client.connect();


        const userCollection = client.db("testDB").collection("test");

        app.post("/user", async (req, res) => {
            const user = req.body;
            const result = await userCollection.insertOne(user);
            res.send(result);
        });




        app.get("/user", async (req, res) => {
            const user = await userCollection.find().toArray();
            res.send(user);
        });










        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }
    finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);






app.get("/", (req, res) => {
    res.json({
        message: "The server is running!"
    })
});



app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
});