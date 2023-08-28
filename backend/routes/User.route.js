const { Router } = require("express");
const { UserModel } = require("../model/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRouter = Router();

// Register
userRouter.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            const user = new UserModel({ name, email, password: hash });
            await user.save();
            res.status(200).send({ msg: "New user has been registered." });
        });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Login
userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });

        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                // result == true
                if (result) {
                    const token = jwt.sign(
                        { Mentor: "Students" },
                        "video-calling"
                    );
                    res.status(200).send({
                        msg: "LoggedIn successfully",
                        token: token,
                    });
                } else {
                    res.status(200).send({ msg: "Wrong Credentials" });
                }
            });
        } else {
            res.status(200).send({ msg: "User not found" });
        }
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

module.exports = { userRouter };
