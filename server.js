// implement your API here

//import express from 'express'; // ES2015 Module Import
const express = require("express"); // define the server; // CommonJS Module Import

const helmet = require("helmet");

//initialize router
const cohortsRouter = require("./routers/cohorts-router.js");
const studentsRouter = require("./routers/students-router.js");

const server = express(); // instantiate the server; return back the server

//parses body and add it to req object
const parser = express.json();
server.use(parser); // server now knows how to write JSON. Extends express by using middleware
server.use(helmet()); // 3rd party security for headers. Hides x powered by Express

server.use("/api/cohorts", cohortsRouter);
server.use("/api/students", studentsRouter);

server.get("/", (req, res) => {
  //this function is a request handler. It is also middleware.
  //request and response are positional arguments.
  res.status(200).json({ message: "hello" }); // .send is a method of the response object. This sends a quick response back to the client
});

// export default server
module.exports = server;
