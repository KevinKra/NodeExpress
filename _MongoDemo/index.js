const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/playground", { useNewUrlParser: true })
  .then(() => console.log("connected to mongoDB!"))
  .catch(err => console.error("Could not connect to mongo DB...", err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});

const Course = mongoose.model("Course", courseSchema);

const createCourse = async () => {
  const course = new Course({
    name: "Angular Course",
    author: "Kevin",
    tags: ["angular", "frontend"],
    isPublished: true
  });

  const result = await course.save();
  console.log(result);
};

//query courses
const getCourses = async () => {
  // const courses = await Course.find();
  const courses = await Course.find({ author: "Kevin", isPublished: true });
  console.log(courses);
};

getCourses();
