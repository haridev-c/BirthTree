const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.CONN_STRING).then(console.log("Connected to DB"));

app.listen(7878, () => {
  console.log("Server is listening at http://localhost:7878");
});
