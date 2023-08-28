const express = require("express");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/User.route");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/users", userRouter);

// Protected Routes
app.get("/talkvally", (req, res) => {
    const token = req.headers.authorization;
    // console.log(token.split(" ")[1]);
    jwt.verify(token.split(" ")[1], "video-calling", (err, decoded) => {
        if (decoded) {
            res.status(200).send("Video Calling");
        } else {
            res.status(400).send({ err: err.message });
        }
    });
});

app.listen(process.env.port, async () => {
    try {
        await connection;
        console.log(`Connected to DB at ${process.env.port}`);
    } catch (error) {
        console.log(error);
        console.log("Something went wrong.");
    }
    console.log("Server is running....");
});
