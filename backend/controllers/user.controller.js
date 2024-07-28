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

const loginUser = async (req, res) => {
  console.log("- - - - - - - - - - ");
  console.log("Started loginUser() in user.controller.js");
  try {
    const { email, password } = req.body;
    console.log("Checking email id for existing account");
    const doc = await Users.findOne({ email }).select("+password").exec();
    console.log(doc);
    if (doc) {
      console.log("Email id found, comparing password with hash");
      bcrypt.compare(password, doc.password).then((result) => {
        if (result) {
          console.log("Hash matched successfully; signing JWT token");
          jwt.sign(
            { _id: doc._id, email: doc.email },
            jwtSecret,
            {},
            (err, token) => {
              if (err) throw err;
              console.log(
                "Signed JWT successfully; sending the JWT back with the response"
              );

              // removing password before sending user details
              const userWithoutPassword = doc.toObject();
              delete userWithoutPassword.password;
              res
                .status(200)
                .cookie("token", token)
                .json({
                  success: true,
                  message: "Login Successfull",
                  userDetails: userWithoutPassword,
                });
            }
          );
        } else {
          console.log(
            "Password did not match; alerting user to check password"
          );
          res.status(400).json({
            success: false,
            message: "Password did not match, try again",
          });
          console.log("Response sent");
        }
      });
    } else {
      console.log("No doc found");
      res.status(404).json({
        success: false,
        message: "Did not find any existing account, please Sign up",
      });
    }
  } catch (error) {
    console.log("Error in loginUser() in user.controller.js");
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = { createUser, loginUser };
