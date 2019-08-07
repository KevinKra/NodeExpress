const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/mongo-exercises", {
  useNewUrlParser: true
});

const courseSchema = mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: Date,
  isPublished: Boolean,
  price: Number
});

const Course = mongoose.model("Course", courseSchema);

const getCourses = async () => {
  return await Course.find({ isPublished: true })
    .sort("-price")
    .select("name author price");
};

const run = async () => {
  const output = await getCourses();
  console.log(output);
};

// run();
// updateCourse("5a6900fff467be65019a9001");

// async function updateCourse(id) {
//   //Approach: Query first
//   //findById()
//   //Modify its properties
//   //save()
//   // const course = await Course.findById(id);
//   // if (!course) {
//   //   console.log("error ERORROR1");
//   //   console.log(id);
//   //   return;
//   // }
//   // course.set({
//   //   isPublished: true,
//   //   author: "Another Author"
//   // });

//   // const result = await course.save();
//   // console.log(result);

//   //Approach: Update First
//   //update directly
//   //optionally get the updated data
//   const course = await Course.update(
//     { _id: id },
//     {
//       $set: {
//         author: "Mosh",
//         isPublished: false
//       }
//     }
//   );
//   console.log(course);
//   // if (!course) {
//   //   console.log("error ERORROR1");
//   //   console.log(id);
//   //   return;
//   // }
//   // course.set({
//   //   isPublished: true,
//   //   author: "Another Author"
//   // });

//   // const result = await course.save();
//   // console.log(result);
// }
