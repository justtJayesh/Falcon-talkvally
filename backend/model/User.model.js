const mongoose = require("mongoose");

// Schema will set the structure of the data which is going to get stored in the database.
const userSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
    },
    {
        versionKey: false,
    }
);

// model is a constructor function
const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };
