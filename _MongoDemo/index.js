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
// const getCourses = async () => {
//   // const courses = await Course.find();
//   const courses = await Course.find({ author: "Kevin", isPublished: true })
//     .limit(10)
//     .sort({ name: 1 })
//     .select({ name: 1, tags: 1 });
//   console.log(courses);
// };

// const getCourses = async () => {
//   // const courses = await Course.find();
//   const courses = await Course
//     // .find({ $gt: 10, $lte: 20 })
//     .find({ $in: [10, 15, 20] })
//     .limit(10)
//     .sort({ name: 1 })
//     .select({ name: 1, tags: 1 });
//   console.log(courses);
// };

//regex
const getCourses = async () => {
  // const courses = await Course.find();
  const pageNumber = 2;
  const pageSize = 10;
  const courses = await Course
    // .find({ $gt: 10, $lte: 20 })
    .find({ author: /^Kevin/ })
    // .or([{ author: "Mosh" }, { isPublished: true }])
    .skip((pageNumber - 1) * pageSize)
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  // .count();
  console.log(courses);
};

getCourses();
