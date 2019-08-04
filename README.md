# Node Training

# Intro

### Why node?

- Great for prototyping and agile development
- Superfast and highly scalable
- All JavaScript
- Cleaner / more consistent code base
- Large ecosystem of open-source libraries

### Node Architecture

- Provides a run-time environment that exists outside of the browser. NodeJS is built on Chrome's V8 engine. The V8 engine is embedded in a C++ program, hence how it can access the machine. Node is not a framework, it's simply a run time environment.

### Node is asynchronous

- Node utilizes "non-blocking" asynchronous architecture by default. A single thread handles all the requests / clients to the server, when we get a request and it's in the process of being resolved, it's placed in the `event queue`. Node continually checks the `event queue` and handles the request once it's been fulfilled. Node is ideal for application that need a lot of disk or network access, more clients can be served without the need of additional hardware. However, Node is not suitable for CPU-intensive applications because the thread would be stuck handling CPU intensive operations instead of touching the file/network and serving requests.

# Node Module system

- Node utilizes the `Module System`, what this means is that scope only exists within each specific file unless explicitly exported/imported into different modules. Variables and functions are encapsulated inside their specific module (file), they are considered `private` variables unless exported and thus are considered `public` variables that get `loaded` into other modules. The modular system in Node works by using IIFEs to wrap every file.
- Noteworthy modules: FileSystem, HTTP (creating web servers), OS, Path, Process, Query Strings, Streams (Data streams)

### The Global Object

- setTimeout(), clearTimeout(), setInterval(), clearInterval(), etc. All exist on the Node Global Object.
- `global.console.log()` instead of `window.console.log()`

### Where is the window object?

- The window object/DOM is particular to web applications. Node leverages C++ to access different objects that exist on the machine for instance the file system or OS.

#### Noteworthy modules

- Event: Indicate something has happened in the application. Example, we create an HTTP port and every time something happens at that port, we receive an event. EventEmitter is a very important Event class.

## SemVer (Semantic Versioning NPM)

- ^5.1.13 carrot allows for any version under the same Major branch release 5.~
- ~3.3.1 tilda allows for any version under the same major/minor branches (only patches). 3.3 ~
- `npm list` or `npm list --depth=0` to see current packages
- `npm view <package>` shows metadata regarding a package
- `npm i mongoose@2.4.2` download specific package version
- `npm i -g npm-check-updates` => `ncu` or `ncu -u` to check for updates / update the package. Still requires new `npm install` to install updated package.
- dev dependencies do not go into the production environment.
- command line tools (global packages) are not particular to specific files.

## RESTful Architecture

- App Client (frontend) needs to talk to the server (backend) using the HTTP protocol. Server exposes services that can be accessed by the client via the HTTP requests.
- REST (Representational State Transfer) CREATE | READ | UPDATE | DELETE, CRUD operations.
- http://vidly.com/api/customers, in order: app protocol, domain, convention to expose Restful services, resource (customers resource in this case) endpoint
- HTTP verbs/methods: GET | POST | PUT | DELETE
- `?sortBy=name` is an example of a query parameter which can be returned with `req.query`
- `Schema`, a Schema defines the shape of our objects. What properties do we have in an object, email, password, valid inputs, etc.

# Express

- Simplifies RESTful services compared to original Node structuring.
- Essentially an amalgamation of MiddleWare.

### MiddleWare

- MiddleWare in Express: RouteHandlers which take the req.body and handle it sending out an appropriate response.
- `express.json()` reads the request, if there is a json object in the body of the request object, it parses it.
- `express.urlencoded({extended: true})` reads the URL payload and updates the database directly.
- MiddleWare is called in sequence and they should be written in separate modular files.
- `Request Processing Pipeline` is the process of handling requests with middleware. Either returns a response, or passes the request to an additional middleware func.

custom middleware: `app.use(req, res, next) {...; next(); }`, next is a reference to next middleware function in the pipeline. It needs to be invoked in the func body otherwise the pipeline can't progress. Keep middleware functions in separate files and import back into the main.

thirdParty middleware: `morgan` (allows logging), `helmet`

### Environments

- The environment, whether `production` or `development` can have specific middleware applied to it. For instance, if you're in a development environment you may want to use `morgan` the log your requests, while not having this middleware available (and slowing down) your production pipeline.

`console.log(`NODE_ENV: \${process.env.NODE_ENV}`);` -- Returns undefined
`console.log(`app: \${app.get("env")}`);` -- Returns current env

```
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log("Morgan enabled...");
}
```

setting env variable: `export NODE_ENV=production`

#### Configuration Settings

- Using different databases or "mail-servers" depending on which environment you're in. Using `npm config` package you can create a config folder with sub-dirs for default, development, and production configurations that are then logged via:

```
console.log("App name: " + config.get("name"));
console.log("Mail server: " + config.get("mail.host"));
```

and determined by `export NODE_ENV=production`

! Do not store passwords or secrets in the source control repository, store them instead in env variables.

#### Debugging

- By using the `debug` package, we can contain debug logs based on the env variable being exported to the debugger.
- Perfer the debug module over `console.log` statements.

`const startupDebugger = require("debug")("app:startup");`
`const dbDebugger = require("debug")("app:db");`

```
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startupDebugger("Morgan enabled...");
}
```

or

`dbDebugger("Connected to the database...");`

```Terminal Commands
export DEBUG=app:<namespace>
export DEBUG=app:*
export DEBUG=app:startup
export DEBUG=app:db
export DEBUG=
```

Set debug module, and start the server.
`DEBUG=app:db nodemon`
