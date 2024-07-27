const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./routers/userRoute");
require("dotenv").config();

const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

// Routers
app.use("/users", userRouter);

mongoose.connect(process.env.CONN_STRING).then(console.log("Connected to DB"));

app.listen(7878, () => {
  console.log("Server is listening at http://localhost:7878");
});
