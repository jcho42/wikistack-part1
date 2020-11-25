const express = require("express");
const morgan = require("morgan");
const { db, Page, User } = require("./models");
const wikiRouter = require("./routes/wiki");
const usersRouter = require("./routes/users");

const app = express();

db.authenticate().then(() => {
  console.log("connected to the database");
});

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use("/wiki", wikiRouter);
app.use("/users", usersRouter);

app.get("/", (req, res, next) => {
  res.redirect("/wiki");
});

const PORT = 3000;
const init = async () => {
  try {
    await db.sync({ force: false });
    app.listen(PORT, () => {
      console.log(`app is running on port: ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

init();
