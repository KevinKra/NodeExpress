##Node Training

###Why node?

- Great for prototyping and agile development
- Superfast and highly scalable
- All JavaScript
- Cleaner / more consistent code base
- Large ecosystem of open-source libraries

###Node Architecture

- Provides a run-time environment that exists outside of the browser. NodeJS is built on Chrome's V8 engine. The V8 engine is embedded in a C++ program, hence how it can access the machine. Node is not a framework, it's simply a run time environment.

###Node is asynchronous

- Node utilizes "non-blocking" asynchronous architecture by default. A single thread handles all the requests to the server, when we get a request and it's in the process of being resolved, it's placed in the `event queue`. Node continually checks the `event queue` and handles the request once it's been fulfilled. Node is ideal for application that need a lot of disk or network access, more clients can be served without the need of additional hardware. However, Node is not suitable for CPU-intensive applications because the thread would be stuck handling CPU intensive operations instead of touching the file/network and serving requests.
