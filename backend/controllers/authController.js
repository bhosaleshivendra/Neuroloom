const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

// ==========================
// SIGNUP
// ==========================

const signup = async (req, res) => {
  try {
    const { username, email, password, companyName } = req.body;

    if (!username || !email || !password || !companyName) {
      return res.status(400).json({
        message: "Please fill all the fields.",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      companyName,
    });

    res.status(201).json({
      message: "Account created successfully.",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        companyName: user.companyName,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// ==========================
// LOGIN
// ==========================

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Please enter email and password.",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User does not exist.",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Incorrect password.",
      });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      message: "Login Successful",
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        companyName: user.companyName,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// ==========================
// GET CURRENT USER
// ==========================

const getCurrentUser = async (req, res) => {
  try {
    res.status(200).json({
      user: req.user,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  signup,
  login,
  getCurrentUser,
};