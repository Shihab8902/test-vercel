require("dotenv").config();
const express = require("express");
const app = express();

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.json({
        message: "The server is running!"
    })
});

app.get("/user", (req, res) => {
    res.send("The user is active....")
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
});