const config = require("config");
const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const express = require("express");
const logger = require("./middleware/logger");
const courses = require("./routes/courses");
const home = require("./routes/home");
const authenticator = require("./middleware/authenticator");
const helmet = require("helmet");
const morgan = require("morgan");
const app = express();

app.set("view engine", "pug");
app.set("views", "./views"); //default

// config
console.log("App name: " + config.get("name"));
console.log("Mail server: " + config.get("mail.host"));
console.log("Mail password: " + config.get("mail.password"));

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app: ${app.get("env")}`);

//middleware used by app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
//Handle routing
app.use("/api/courses", courses);
app.use("/", home);

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startupDebugger("Morgan enabled...");
}

//DB work
dbDebugger("Connected to the database...");

app.use(logger);

app.use(authenticator);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}...`));
