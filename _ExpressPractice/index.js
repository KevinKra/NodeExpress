//set up RESTful api ✓
//config ✓
//custom middleware ✓
//handle routes ✓
//handle views ✓

const express = require("express");
const morgan = require("morgan");
const debug = require("debug")("app:startup");
const authenticator = require("./middleware/authenticator");
const logger = require("./middleware/logger");
const home = require("./routes/home");
const books = require("./routes/books");

const app = express();

getRepositories("Jimbob", cb => {
  console.log("cb", cb);
});

function getRepositories(username, cb) {
  setTimeout(() => {
    cb({ username, repos: ["repo1", "repo2", "repo3"] });
  }, 2000);
}

//configuration && debugging
console.log(`app: ${app.get("env")}`);

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  debug("Morgan enabled...");
}

app.set("view engine", "pug");
app.set("views", "./views"); //default

app.use(express.json());
app.use(authenticator);
app.use(logger);

app.use("/api/books/", books);
app.use("/", home);

const port = process.env.port || 3000;
app.listen(port, () => console.log("Server running on port 3000..."));
