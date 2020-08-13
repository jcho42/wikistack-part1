const express = require("express");
const morgan = require("morgan");
const { db } = require("./models");

const app = express();

db.authenticate().then(() => {
  console.log("connected to the database");
});

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res, next) => {
  res.send("hello world");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`app is running on port: ${PORT}`);
});
