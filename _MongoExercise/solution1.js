//1 connect to mongoose
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/mongoose-exercises", {
  useNewUrlParser: true
});
//2 write the schema
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: Date,
  isPublished: Boolean,
  price: Number
});
//3 connect the schema to the model
getCourses = mongoose.model("Course", courseSchema);

//4 get courses matching certain criteria
getCourses = async () => {
  return await Course.find({ isPublished: true, tags: "backend" })
    .sort({ name: 1 })
    .select({ name: 1, author: 1 });
};

async function run() {
  const courses = await getCourses();
  console.log(courses);
}

run();
