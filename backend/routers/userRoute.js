const express = require("express");
const {
  createUser,
  loginUser,
  getUserFromToken,
  logoutUser,
} = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.post("/create", createUser);
userRouter.post("/login", loginUser);
userRouter.get("/user", getUserFromToken);
userRouter.delete("/token", logoutUser);

module.exports = userRouter;
