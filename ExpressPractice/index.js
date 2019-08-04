//set up RESTful api ✓
//config
//custom middleware ✓
//handle routes
//handle views

const express = require("express");
const Joi = require("@hapi/joi");
const authenticator = require("./middleware/authenticator");
const logger = require("./middleware/logger");

const app = express();
const books = [];

app.set("view engine", "pug");
app.set("views", "./views"); //default

app.use(express.json());
app.use(authenticator);
app.use(logger);

app.get("/", (req, res) => {
  res.render("index.pug", {
    title: "My Express Practice App",
    message: "Heya!"
  });
});

app.get("/api/books", (req, res) => {
  if (books.length === 0)
    return res.send("Currently no books have been saved. :(");
  res.send(books);
});

app.get("/api/books/:id", (req, res) => {
  const matchingBook = books.find(book => book.id === parseInt(req.params.id));
  if (!matchingBook)
    return res
      .status(404)
      .send("Hmm, it doesn't seem like that book exists...");
  res.send(matchingBook);
});

app.post("/api/books", (req, res) => {
  //validate input
  const { error } = validateReq(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //add to data
  const newBook = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author
  };
  books.push(newBook);
  //return data
  res.send(newBook);
});

app.put("/api/books/:id", (req, res) => {
  //validate the input, error
  const { error } = validateReq(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //locate matching id, error
  const matchingBook = books.find(book => book.id === parseInt(req.params.id));
  if (!matchingBook)
    return res
      .status(404)
      .send("Uh oh, that book doesn't seem to exist in the database. ☹️");
  //update data
  matchingBook.title = req.body.title;
  matchingBook.author = req.body.author;
  //return data
  res.send(matchingBook);
});

app.delete("/api/books/:id", (req, res) => {
  //find matching book & delete, error
  const matchingBook = books.find(book => book.id === parseInt(req.params.id));
  if (!matchingBook)
    return res
      .status(404)
      .send("Hmm, it doesn't seem like that book exists...");
  const index = books.indexOf(matchingBook);
  books.splice(index, 1);
  //return deleted
  res.send(matchingBook);
});

const port = process.env.port || 3000;
app.listen(port, () => console.log("Server running on port 3000..."));

function validateReq(book) {
  const schema = {
    title: Joi.string()
      .min(2)
      .required(),
    author: Joi.string()
      .min(5)
      .required()
  };
  return Joi.validate(book, schema);
}
