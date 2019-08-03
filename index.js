// const log = require("./logger");

// ===Relative path modular imports===

function sayHello(name) {
  console.log(`Hello ${name}`);
}

// sayHello("Kevin");
// log("steven");
// console.log(module);

// ===loading the path module===
const path = require("path");

var pathObj = path.parse(__filename);
// console.log(pathObj);

// ===loading the OS module===
const OS = require("os");

const freeMemory = OS.freemem();
const totalMemory = OS.totalmem();

// console.log(`freeMemory: ${freeMemory}, totalMemory: ${totalMemory}`);

// ===loading the FS module===
const fs = require("fs");

const files = fs.readdirSync("./");
// console.log(files);

// fs.readdir("$", (err, result) => {
//   if (err) console.log("Error", err);
//   else console.log("Result", result);
// });

// // ===loading the Event module===
// const EventEmitter = require("events");
// const emitter = new EventEmitter();

// //Register a listener with an event arg
// emitter.on("messageLogged", arg => {
//   console.log("Listener called", arg);
// });

// //Raise an event with an event argument
// emitter.emit("messageLogged", { id: 1, url: "http://" });

// // ===loading the Event module w/ class leverage===
const Logger = require("./logger");
const logger = new Logger();

logger.on("messageLogged", arg => {
  console.log("Listener called", arg);
});
logger.log("wow");
// log("message");
