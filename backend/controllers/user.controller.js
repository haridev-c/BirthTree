const Users = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const saltRounds = 10;
const jwtSecret = "asjkdbv9238r4jvdsb";

const createUser = async (req, res) => {
  console.log("- - - - - - - - - - ");
  console.log("Started createUser() in user.controller.js");
  try {
    const { name, email, password, dob } = req.body;

    console.log("Checking for existing user");
    const doc = await Users.findOne({ email });

    if (doc) {
      console.log(
        "Existing user found; alerting user to login insted of signup"
      );
      res.status(400).json({
        message: "User already exists, please login",
        success: false,
      });
    } else {
      console.log("No existing user found; creating new user");
      bcrypt.hash(password, saltRounds).then(async (hash) => {
        const newUser = await Users.create({
          name,
          email,
          dob,
          password: hash,
        });
        res.status(201).json({
          message: "Account created successfully, you can now proceed to login",
          success: true,
        });
        console.log("Successfully created a new account");
      });
    }
  } catch (error) {
    console.log("Error in createUser()");
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { createUser };
