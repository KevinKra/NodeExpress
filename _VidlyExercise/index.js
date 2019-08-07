//Vidly is a movie database, let users add, edit, and remove videos.

const express = require("express");
const Joi = require("@hapi/joi");

const app = express();
app.use(express.json());
const videos = [];

app.get("/api/videos", (req, res) => {
  res.send(videos);
});

app.get("/api/videos/:id", (req, res) => {
  const matchingVideo = videos.find(
    video => parseInt(req.params.id) === video.id
  );
  if (!matchingVideo)
    return res.status(404).send("Video with that ID not found");
  res.send(matchingVideo.video);
});

app.post("/api/videos/", (req, res) => {
  //validate input
  const { error } = validateInput(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //update courses
  const newVideo = {
    id: videos.length + 1,
    video: req.body.video
  };
  videos.push(newVideo);
  res.send(newVideo);
  //return course
});

app.put("/api/videos/:id", (req, res) => {
  //locate | 404 if not
  const matchingVideo = videos.find(
    video => parseInt(req.params.id) === video.id
  );
  if (!matchingVideo) return res.status(404).send("No matching videos found!");
  //validate
  const result = validateInput(req.body);
  if (result.error) return res.status(404).send(error.details[0].message);
  //update
  matchingVideo.video = req.body.video;
  //return
  res.send(matchingVideo);
});

app.delete("/api/videos/:id", (req, res) => {
  const matchingVideo = videos.find(
    video => video.id === parseInt(req.params.id)
  );
  if (!matchingVideo) return res.status(404).send("No matching videos found!");
  const index = videos.indexOf(matchingVideo);
  videos.splice(index, 1);
  res.send(matchingVideo);
});

const port = process.env.port || 3000;
app.listen(port, () => console.log(`listening on port ${port}!`));

function validateInput(course) {
  const schema = {
    video: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(course, schema);
}
