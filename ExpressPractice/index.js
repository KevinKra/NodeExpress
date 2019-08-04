const express = require("express");
const Joi = require("@hapi/joi");

const app = express();
app.use(express.json());

const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});

const movies = [];

app.get("/", (req, res) => {
  res.send("welcome!");
});

app.get("/api/movies", (req, res) => {
  res.send(movies);
});

app.get("/api/movies/:id", (req, res) => {
  const matchingMovie = movies.find(
    movie => movie.id === parseInt(req.params.id)
  );
  if (!matchingMovie) return res.status(404).send("No matching movies found.");
  res.send(matchingMovie);
});

app.post("/api/movies", (req, res) => {
  //validate the inputs, determine schema
  const schema = {
    movie: Joi.string()
      .min(2)
      .required(),
    desc: Joi.string()
      .min(5)
      .max(10)
  };
  const output = Joi.validate(req.body, schema);
  if (output.error)
    return res.status(400).send(output.error.details[0].message);
  const newMovie = {
    id: movies.length + 1,
    movie: req.body.movie,
    desc: req.body.desc
  };
  movies.push(newMovie);
  res.send(movies);
});

app.put("/api/movies/:id", (req, res) => {
  //validate input, error
  const schema = {
    movie: Joi.string()
      .min(3)
      .required(),
    desc: Joi.string()
      .min(5)
      .max(10)
  };
  const output = Joi.validate(req.body, schema);
  if (output.error)
    return res.status(400).send(output.error.details[0].message);
  //check there is something to replace, error
  const matchingMovie = movies.find(
    movie => movie.id === parseInt(req.params.id)
  );
  if (!matchingMovie)
    return res.status(404).send("Sorry, no matching movie has been found.");
  //replace it
  matchingMovie.movie = req.body.movie;
  matchingMovie.desc = req.body.desc;
  //send response
  res.send(matchingMovie);
});

app.delete("/api/movies/:id", (req, res) => {
  //find matching movie, error
  const matchingMovie = movies.find(
    movie => movie.id === parseInt(req.params.id)
  );
  if (!matchingMovie)
    return res.status(404).send("Whoops! Looks like that movie doesnt exist!");
  //delete
  const index = movies.indexOf(matchingMovie);
  movies.splice(index, 1);
  //return movies
  res.send(movies);
});
