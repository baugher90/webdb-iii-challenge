const express = require("express");
const helmet = require("helmet");
const cohortRouter = require("../routes/cohortsRouter");
const studentRouter = require("../routes/studentsRouter")

const server = express();

server.use(express.json(),helmet());
server.use("/api/cohort",cohortRouter);
server.use("/api/student",studentRouter)

module.exports = server;