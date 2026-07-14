const User = require("../models/User");
const bcrypt = require("bcryptjs");


const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = await User.create({
            name,
            email,
            password
        });

        console.log(`User created successfully: ${user.email}`);

        res.status(201).json({
            message: "User created successfully",
            user
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
  signup,
};