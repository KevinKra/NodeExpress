const express = require("express");
const router = express.Router();
const Joi = require("@hapi/joi");

const books = [];

router.get("/", (req, res) => {
  if (books.length === 0)
    return res.send("Currently no books have been saved. :(");
  res.send(books);
});

router.get("/:id", (req, res) => {
  const matchingBook = books.find(book => book.id === parseInt(req.params.id));
  if (!matchingBook)
    return res
      .status(404)
      .send("Hmm, it doesn't seem like that book exists...");
  res.send(matchingBook);
});

router.post("", (req, res) => {
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

router.put("/:id", (req, res) => {
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

router.delete("/:id", (req, res) => {
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

module.exports = router;
