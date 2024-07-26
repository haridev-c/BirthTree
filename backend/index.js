const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.listen(7878, () => {
  console.log("Server is listening at http://localhost:7878");
});
