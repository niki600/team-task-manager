const express = require("express");

const router = express.Router();

const User = require("../models/User");

const jwt = require("jsonwebtoken");

router.get("/test", (req, res) => {
  res.json({
    message: "Auth route working"
  });
});

router.post("/signup", async (req, res) => {

  try {

    const { name, email, password } = req.body;

    const user = await User.create({
      name,
      email,
      password
    });

    res.json({
      message: "User created successfully",
      user
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});

router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {

      return res.status(404).json({
        message: "User not found"
      });

    }

    if (user.password !== password) {

      return res.status(400).json({
        message: "Invalid password"
      });

    }
const token = jwt.sign(

  {
    id: user._id,
    role: user.role
  },

  process.env.JWT_SECRET,

  {
    expiresIn: "1d"
  }

);

res.json({

  message: "Login successful",

  token,

  user: {
    name: user.name,
    role: user.role
  }

});

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});

module.exports = router;