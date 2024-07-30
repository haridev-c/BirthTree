const express = require("express");
const {
  createUser,
  loginUser,
  getUserFromToken,
} = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.post("/create", createUser);
userRouter.post("/login", loginUser);
userRouter.get("/user", getUserFromToken);

module.exports = userRouter;
