const express = require("express");
const cors = require("cors");

const connect = require("./src/configs/db");
const userController = require("./src/controllers/user.controller");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/user", userController);

app.listen(8080, async () => {
  try {
    console.log("Connecting...");
    await connect();
    console.log("Listening on port 8080");
  } catch (error) {
    console.error(error);
  }
});
