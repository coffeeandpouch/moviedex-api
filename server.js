const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));

app.use((req, res) => {
  res.send("good morning, world!");
});

const PORT = 8000;

app.listen(PORT, () => {
  console.log("server listening at http://localhost:${PORT}");
});
