const express = require("express");
const router = express.Router();
const Joi = require("@hapi/joi");

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" }
];

router.get("/:id", (req, res) => {
  const course = courses.find(course => course.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given ID was not found.");
  res.send(course);
});

router.post("/", (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});

router.put("/:id", (req, res) => {
  //locate course
  const matchingCourse = courses.find(
    course => course.id === parseInt(req.params.id)
  );
  if (!matchingCourse)
    return res.status(404).send("The course with the given id was not found.");

  //input validation
  // const result = validateCourse(req.body);
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //update course
  matchingCourse.name = req.body.name;

  //return updated course
  res.send(matchingCourse);
});

router.delete("/:id", (req, res) => {
  //look up
  const matchingCourse = courses.find(
    course => course.id === parseInt(req.params.id)
  );
  //not existing, 404
  if (!matchingCourse)
    return res.status(404).send("The course with the given id was not found.");
  //delete
  const index = courses.indexOf(matchingCourse);
  courses.splice(index, 1);
  //return same course
  res.send(matchingCourse);
});

function validateCourse(course) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(course, schema);
}

module.exports = router;
