require("dotenv").config();
const express = require("express");
const morgan = require("morgan");

console.log(process.env.API_TOKEN);

const app = express();

app.use(morgan("dev"));
app.use(validateBearerToken);

function validateBearerToken(req, res, next) {
  const apiToken = process.env.API_TOKEN;
  const authToken = req.get("Authorization");
  if (!authToken || authToken.split(" ")[1] !== apiToken) {
    return res.status(401).json({ error: "Unauthorized Request" });
  }
  next();
}

app.get("/movie", (req, res) => {
  let movies = [
    { title: "Karate Kid", genre: "Action", country: "USA" },
    { title: "Karate Kid 2", genre: "Romance", country: "USA" },
  ];

  const validGenres = [...new Set(movies.map((m) => m.genre))];

  let results = movies;

  if (req.query.genre && !validGenres.includes(req.query.genre)) {
    res.status(400).json({ error: "Invalid Genre" });
  }

  if (req.query.genre && validGenres.includes(req.query.genre)) {
    results = results.filter((m) => m.genre === req.query.genre);
  }

  if (req.query.country) {
    results = results.filter((m) => m.country === req.query.country);
  }

  if (req.query.avg_vote) {
    results = results.filter((m) => m.avg_vote >= req.query.avg_vote);
  }

  res.json(results);
});

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`server listening at http://localhost:${PORT}`);
});
