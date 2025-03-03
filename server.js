const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/user.route");
const myfriendRoute = require("./routes/myfriend.route");
require("dotenv").config();


const app = express(); // create web server
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use("/user", userRoute);
app.use("/myfriend", myfriendRoute);
app.use("/images/user", express.static("images/user"));
app.use("/images/myfriend", express.static("images/myfriend"));

app.get("/", (req, res) => {
  res.json({ message: "Hello from server on port" + PORT });
});

//create web server connection from client/user
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
