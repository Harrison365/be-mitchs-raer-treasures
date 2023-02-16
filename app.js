const express = require("express");
const app = express();
const { getTreasures } = require("./controller/controller");
app.use(express.json());

app.get("/api/treasures", getTreasures);

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
});

app.use((err, req, res, next) => {
  if (error.code === "22P02") {
    response.status(400).send({ msg: "Bad Request" });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Something went wrong" });
});

module.exports = app;
